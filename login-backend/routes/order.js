// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/successful', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

module.exports = router;
