const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to get all PDF files from the uploads directory
function getPDFFiles() {
  const uploadsDir = path.join(__dirname, '..', 'uploads', 'books');
  if (!fs.existsSync(uploadsDir)) {
    console.error('Uploads directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(uploadsDir);
  return files.filter(file => file.toLowerCase().endsWith('.pdf'));
}

async function updateBooks() {
  try {
    // Get all PDF files
    const pdfFiles = getPDFFiles();
    console.log('Found PDF files:', pdfFiles);

    if (pdfFiles.length === 0) {
      console.error('No PDF files found in uploads directory');
      process.exit(1);
    }

    // Delete all existing books
    await Book.deleteMany({});
    console.log('Deleted all existing books');

    // Create new book entries for each PDF file
    for (const pdfFile of pdfFiles) {
      const title = pdfFile.replace('.pdf', '');
      const book = new Book({
        title: {
          en: title,
          fa: title // You can update this with proper Dari titles later
        },
        author: {
          en: "Unknown Author",
          fa: "نویسنده ناشناس"
        },
        category: {
          en: "General",
          fa: "عمومی"
        },
        description: {
          en: `This is a book about ${title}. Please update this description with accurate information.`,
          fa: `این کتابی درباره ${title} است. لطفاً این توضیحات را با اطلاعات دقیق به‌روز کنید.`
        },
        publishYear: new Date().getFullYear(),
        pages: 0, // You can update this with actual page count later
        imageUrl: `/uploads/thumbnails/${title}_thumb.png`,
        readUrl: `/books/${pdfFile}`,
        downloadUrl: pdfFile
      });

      await book.save();
      console.log(`Created book entry for ${pdfFile}`);
    }

    console.log('Database update completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
}

// Run the update
updateBooks(); 