const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single news article
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a news article
router.post('/', async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
    summary: req.body.summary
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 