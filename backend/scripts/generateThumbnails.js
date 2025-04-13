const fs = require('fs');
const path = require('path');
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

// Create thumbnails directory if it doesn't exist
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

function generateThumbnail(pdfPath, outputPath) {
  return new Promise((resolve, reject) => {
    // First convert PDF to PNG using pdftoppm
    const tempPngPath = path.join(
      path.dirname(outputPath),
      `${path.basename(outputPath, '.png')}-temp.png`
    );

    exec(`pdftoppm -png -singlefile "${pdfPath}" "${tempPngPath.replace('.png', '')}"`, async (error) => {
      if (error) {
        console.error(`Error converting PDF to PNG: ${error}`);
        reject(error);
        return;
      }

      try {
        // Resize the image to create a thumbnail
        await sharp(tempPngPath)
          .resize(300, 400, {
            fit: 'cover',
            position: 'center'
          })
          .toFile(outputPath.replace('.png', '_thumb.png'));

        // Delete the temporary PNG
        fs.unlinkSync(tempPngPath);

        resolve(true);
      } catch (err) {
        console.error(`Error processing image: ${err}`);
        reject(err);
      }
    });
  });
}

async function processBooks() {
  try {
    // Get all books from the database
    const books = await Book.find({});
    console.log(`Found ${books.length} books to process`);

    for (const book of books) {
      const pdfPath = path.join(booksDir, book.downloadUrl);
      const thumbnailPath = path.join(thumbnailsDir, `${book._id}.png`);

      if (!fs.existsSync(pdfPath)) {
        console.error(`PDF file not found: ${pdfPath}`);
        continue;
      }

      console.log(`Processing ${book.title.en}...`);
      try {
        await generateThumbnail(pdfPath, thumbnailPath);
        
        // Update the book's imageUrl in the database
        book.imageUrl = `/uploads/thumbnails/${book._id}_thumb.png`;
        await book.save();
        console.log(`Updated thumbnail for ${book.title.en}`);
      } catch (error) {
        console.error(`Failed to process ${book.title.en}:`, error);
      }
    }

    console.log('Thumbnail generation completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error processing books:', error);
    process.exit(1);
  }
}

// Run the process
processBooks(); 