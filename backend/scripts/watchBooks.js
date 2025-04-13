const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const sharp = require('sharp');
const Book = require('../models/Book');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Paths
const booksDir = path.join(__dirname, '..', 'uploads', 'books');
const thumbnailsDir = path.join(__dirname, '..', 'uploads', 'thumbnails');

// Create directories if they don't exist
if (!fs.existsSync(booksDir)) {
  fs.mkdirSync(booksDir, { recursive: true });
}
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Function to run updateBooks.js
function runUpdateBooks() {
  return new Promise((resolve, reject) => {
    console.log('Running updateBooks.js...');
    const updateProcess = spawn('node', ['scripts/updateBooks.js'], {
      stdio: 'inherit'
    });

    updateProcess.on('close', (code) => {
      if (code === 0) {
        console.log('updateBooks.js completed successfully');
        resolve();
      } else {
        console.error(`updateBooks.js failed with code ${code}`);
        reject(new Error(`updateBooks.js failed with code ${code}`));
      }
    });

    updateProcess.on('error', (err) => {
      console.error('Error running updateBooks.js:', err);
      reject(err);
    });
  });
}

// Function to generate thumbnail for a single book
function generateThumbnail(pdfPath, outputPath) {
  return new Promise((resolve, reject) => {
    // First convert PDF to PNG using pdftoppm
    const tempPngPath = path.join(
      path.dirname(outputPath),
      `${path.basename(outputPath, '.png')}-temp.png`
    );

    // Ensure the output directory exists
    const outputDir = path.dirname(tempPngPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Run pdftoppm with proper output path and quality settings
    exec(`pdftoppm -png -singlefile -r 300 "${pdfPath}" "${tempPngPath.replace('.png', '')}"`, async (error) => {
      if (error) {
        console.error(`Error converting PDF to PNG: ${error}`);
        reject(error);
        return;
      }

      try {
        // Wait a moment to ensure the file is written
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if the temporary file exists
        if (!fs.existsSync(tempPngPath)) {
          throw new Error(`Temporary PNG file not created: ${tempPngPath}`);
        }

        // Verify the PNG file is valid
        const stats = fs.statSync(tempPngPath);
        if (stats.size === 0) {
          throw new Error(`Generated PNG file is empty: ${tempPngPath}`);
        }

        // Resize the image to create a thumbnail with better quality settings
        await sharp(tempPngPath)
          .resize(300, 400, {
            fit: 'cover',
            position: 'center',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .jpeg({ quality: 90 }) // Convert to JPEG for better compatibility
          .toFile(outputPath.replace('.png', '.jpg'));

        // Delete the temporary PNG
        if (fs.existsSync(tempPngPath)) {
          fs.unlinkSync(tempPngPath);
        }

        resolve(true);
      } catch (err) {
        console.error(`Error processing image: ${err}`);
        // Clean up temporary file if it exists
        if (fs.existsSync(tempPngPath)) {
          fs.unlinkSync(tempPngPath);
        }
        reject(err);
      }
    });
  });
}

// Function to update thumbnail for a book
async function updateThumbnail(book) {
  const pdfPath = path.join(booksDir, book.downloadUrl);
  const thumbnailPath = path.join(thumbnailsDir, `${book._id}.png`);

  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    return;
  }

  console.log(`Generating thumbnail for ${book.title.en}...`);
  await generateThumbnail(pdfPath, thumbnailPath);
  
  // Update the book's imageUrl in the database to use .jpg extension
  book.imageUrl = `/uploads/thumbnails/${book._id}.jpg`;
  await book.save();
  console.log(`Updated thumbnail for ${book.title.en}`);
}

// Initialize watcher
const watcher = chokidar.watch(booksDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Track processing state to prevent duplicates
let isProcessing = false;
let initialScanComplete = false;

// Update function
async function updateBooks() {
  if (isProcessing) {
    console.log('Update already in progress, skipping...');
    return;
  }

  try {
    isProcessing = true;
    console.log('Starting update process...');
    
    // First update the books in the database
    await runUpdateBooks();
    
    // Then update thumbnails for all books
    const books = await Book.find({});
    console.log(`Found ${books.length} books to process`);
    
    for (const book of books) {
      // Skip if thumbnail already exists
      const thumbnailPath = path.join(thumbnailsDir, `${book._id}.jpg`);
      if (fs.existsSync(thumbnailPath)) {
        console.log(`Thumbnail already exists for ${book.title.en}, skipping...`);
        continue;
      }
      
      // Wrap updateThumbnail in a new Promise
      await new Promise((resolve, reject) => {
        updateThumbnail(book)
          .then(() => resolve())
          .catch(error => {
            console.error(`Failed to process ${book.title.en}:`, error);
            reject(error);
          });
      });
    }
    
    console.log('Update process completed');
  } catch (error) {
    console.error('Error in update process:', error);
  } finally {
    isProcessing = false;
  }
}

// Add event listeners
watcher
  .on('add', path => {
    console.log(`File ${path} has been added`);
    if (initialScanComplete) {
      updateBooks();
    }
  })
  .on('change', path => {
    console.log(`File ${path} has been changed`);
    if (initialScanComplete) {
      updateBooks();
    }
  })
  .on('unlink', path => {
    console.log(`File ${path} has been removed`);
    if (initialScanComplete) {
      updateBooks();
    }
  })
  .on('error', error => {
    console.error('Error watching files:', error);
  })
  .on('ready', async () => {
    console.log('Initial scan complete. Ready for changes.');
    // Run initial update
    try {
      await runUpdateBooks();
      const books = await Book.find({});
      console.log(`Found ${books.length} books to process initially`);
      
      for (const book of books) {
        // Skip if thumbnail already exists
        const thumbnailPath = path.join(thumbnailsDir, `${book._id}.jpg`);
        if (fs.existsSync(thumbnailPath)) {
          console.log(`Thumbnail already exists for ${book.title.en}, skipping...`);
          continue;
        }
        
        await updateThumbnail(book);
      }
      
      initialScanComplete = true;
      console.log('Initial processing completed');
    } catch (error) {
      console.error('Error in initial update:', error);
    }
  });

console.log(`Watching for changes in ${booksDir}...`);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping watcher...');
  watcher.close();
  mongoose.connection.close();
  process.exit();
}); 