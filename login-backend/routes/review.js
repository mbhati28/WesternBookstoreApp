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

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

router.put('/update-hidden/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { isHidden } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, { isHidden }, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
});

router.get('/booklist/:booklistId', async (req, res) => {
  try {
    const { booklistId } = req.params;
    const reviews = await Review.find({ 
      booklistId: booklistId,
      isHidden: false 
    }).populate('userId', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
