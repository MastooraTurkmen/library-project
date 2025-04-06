const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('../models/Book');
const path = require('path');
const fs = require('fs');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to copy PDF files to uploads directory
const copyPDFFiles = async (sourceDir, targetDir) => {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

  for (const file of pdfFiles) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to uploads directory`);
  }

  return pdfFiles;
};

// Function to generate book metadata
const generateBookMetadata = (filename) => {
  const baseName = path.basename(filename, '.pdf');
  const title = baseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: {
      en: title,
      fa: title // You should manually update Dari titles later
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
    pages: 0, // You should update this manually
    imageUrl: "/images/books/default-book-cover.jpg",
    readUrl: `/books/${filename}`,
    downloadUrl: filename
  };
};

// Main import function
const importBooks = async () => {
  try {
    const sourceDir = path.join(__dirname, '..', 'books'); // Assuming PDFs are in a 'books' directory
    const targetDir = path.join(__dirname, '..', 'uploads', 'books');

    // Copy PDF files
    console.log('Copying PDF files...');
    const pdfFiles = await copyPDFFiles(sourceDir, targetDir);

    // Generate and save book metadata
    console.log('Generating book metadata...');
    for (const pdfFile of pdfFiles) {
      const metadata = generateBookMetadata(pdfFile);
      const book = new Book(metadata);
      await book.save();
      console.log(`Created database entry for ${pdfFile}`);
    }

    console.log('Book import completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing books:', error);
    process.exit(1);
  }
};

// Run the import
importBooks(); 