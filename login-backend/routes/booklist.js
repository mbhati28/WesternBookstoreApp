// routes/booklists.js
const express = require('express');
const Booklist = require('../models/Booklist');
const router = express.Router();

// Get all booklists
router.get('/', async (req, res) => {
  try {
    const booklists = await Booklist.find();
    res.json(booklists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get booklists for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const booklists = await Booklist.find({ userId: req.params.userId });
    res.json(booklists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a booklist
router.post('/', async (req, res) => {
  const books = req.body.books;
  if (books.length > 25) {
    return res.status(400).json({ message: 'Cannot add more than 25 books to a booklist.' });
  }

  const userId = req.body.userId;

  const booklistsCount = await Booklist.countDocuments({ userId });
  if (booklistsCount >= 20) {
    return res.status(400).json({ message: 'Users can create up to 20 booklists only.' });
  }
  
  const booklist = new Booklist({
    userId: req.body.userId,
    name: req.body.name,
    username: req.body.username,
    books: req.body.books,
    isPrivate: req.body.isPrivate,
    description:req.body.description
  });

  try {
    const newBooklist = await booklist.save();
    res.status(201).json(newBooklist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific booklist
router.delete('/:id', async (req, res) => {
  try {
    await Booklist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booklist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all booklists for a specific user
router.delete('/user/:userId', async (req, res) => {
  try {
    await Booklist.deleteMany({ userId: req.params.userId });
    res.json({ message: 'All booklists for user deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
