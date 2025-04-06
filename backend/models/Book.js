const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  author: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  category: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  publishYear: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  readUrl: {
    type: String,
    required: true
  },
  downloadUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);