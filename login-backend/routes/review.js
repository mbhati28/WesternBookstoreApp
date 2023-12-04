// routes/reviews.js
const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Post a new review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews for a booklist
router.get('/booklist/:booklistId', async (req, res) => {
  try {
    const reviews = await Review.find({ booklistId: req.params.booklistId }).populate('userId', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
