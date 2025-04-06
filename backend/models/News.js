const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String], // Array of paragraphs
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema); 