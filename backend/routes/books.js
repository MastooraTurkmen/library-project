const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const path = require('path');
const fs = require('fs');

// Get all books with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || '';
    const lang = req.query.lang || 'en';
    
    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { [`title.${lang}`]: { $regex: search, $options: 'i' } },
            { [`author.${lang}`]: { $regex: search, $options: 'i' } },
            { [`category.${lang}`]: { $regex: search, $options: 'i' } },
          ]
        }
      : {};
    
    const books = await Book.find(searchQuery)
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Book.countDocuments(searchQuery);
    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      hasMore: (page + 1) * limit < total,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download a book
router.get('/:id/download', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get the file path using the book's title
    const fileName = `${book.title.en}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', 'books', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) { 
      return res.status(404).json({ message: 'Book file not found' });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a book
router.get('/:id/read', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get the file path using the book's title
    const fileName = `${book.title.en}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', 'books', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Book file not found' });
    }

    // Set headers for PDF viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book
router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 