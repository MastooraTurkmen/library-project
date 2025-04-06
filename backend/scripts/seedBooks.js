require('dotenv').config();
const mongoose = require('mongoose');
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

// Arrays for generating random book data
const categories = {
  en: ['Fiction', 'Non-fiction', 'Poetry', 'History', 'Science', 'Technology', 'Philosophy', 'Art', 'Biography', 'Politics'],
  fa: ['داستان', 'غیر داستانی', 'شعر', 'تاریخ', 'علم', 'تکنولوژی', 'فلسفه', 'هنر', 'زندگی‌نامه', 'سیاست']
};

const bookTitlesEn = [
  'The Hidden Path', 'Eternal Wisdom', 'Digital Dreams', 'Ancient Echoes', 'Modern Minds',
  'Future Perfect', 'Silent Stories', 'The Art of Living', 'Beyond Horizons', 'Timeless Tales'
];

const bookTitlesFa = [
  'مسیر پنهان', 'حکمت جاودان', 'رویاهای دیجیتال', 'پژواک باستان', 'اندیشه‌های مدرن',
  'آینده کامل', 'داستان‌های خاموش', 'هنر زندگی', 'فراتر از افق', 'قصه‌های بی‌زمان'
];

const authorsEn = [
  'Sarah Johnson', 'Mohammad Ali', 'Emily Chen', 'Ahmad Karimi', 'David Wilson',
  'Fatima Hassan', 'John Smith', 'Maryam Ahmadi', 'Robert Brown', 'Zahra Mohammadi'
];

const authorsFa = [
  'سارا جانسون', 'محمد علی', 'امیلی چن', 'احمد کریمی', 'دیوید ویلسون',
  'فاطمه حسن', 'جان اسمیت', 'مریم احمدی', 'رابرت براون', 'زهرا محمدی'
];

// Function to generate random book descriptions
function generateDescription(index, isEnglish) {
  if (isEnglish) {
    return `This compelling ${categories.en[index % 10].toLowerCase()} book explores fascinating themes and ideas. 
    Through ${Math.floor(Math.random() * 10 + 5)} chapters, the author takes readers on a journey through 
    ${['knowledge', 'imagination', 'history', 'culture', 'science'][index % 5]} and 
    ${['wisdom', 'discovery', 'innovation', 'tradition', 'progress'][index % 5]}. 
    A must-read for anyone interested in ${categories.en[index % 10].toLowerCase()}.`;
  } else {
    return `این کتاب جذاب ${categories.fa[index % 10]} موضوعات و ایده‌های جالبی را بررسی می‌کند. 
    نویسنده در ${Math.floor(Math.random() * 10 + 5)} فصل، خوانندگان را در سفری از 
    ${['دانش', 'تخیل', 'تاریخ', 'فرهنگ', 'علم'][index % 5]} و 
    ${['حکمت', 'اکتشاف', 'نوآوری', 'سنت', 'پیشرفت'][index % 5]} همراهی می‌کند. 
    این کتاب برای علاقه‌مندان به ${categories.fa[index % 10]} ضروری است.`;
  }
}

// Generate 100 books
const books = Array.from({ length: 100 }, (_, index) => ({
  title: {
    en: `${bookTitlesEn[index % 10]} ${Math.floor(index / 10) + 1}`,
    fa: `${bookTitlesFa[index % 10]} ${Math.floor(index / 10) + 1}`
  },
  author: {
    en: authorsEn[index % 10],
    fa: authorsFa[index % 10]
  },
  description: {
    en: generateDescription(index, true),
    fa: generateDescription(index, false)
  },
  publishYear: 2010 + (index % 14), // Books from 2010 to 2023
  pages: 200 + (index * 3), // Pages from 200 to 497
  imageUrl: `https://picsum.photos/seed/book${index}/300/400`,
  category: {
    en: categories.en[index % 10],
    fa: categories.fa[index % 10]
  },
  readUrl: `/books/read/${index + 1}`,
  downloadUrl: `/books/download/${index + 1}`
}));

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Create books directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const booksDir = path.join(uploadsDir, 'books');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    if (!fs.existsSync(booksDir)) {
      fs.mkdirSync(booksDir);
    }

    // Insert new books
    const insertedBooks = await Book.insertMany(books);
    console.log(`Seeded ${insertedBooks.length} books successfully`);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 