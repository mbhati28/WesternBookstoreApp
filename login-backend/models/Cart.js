const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  volumeInfo: {
    title: { type: String, required: true },
    imageLinks: {
      thumbnail: { type: String, required: false }
    }
  },
  saleInfo: {
    listPrice: {
      amount: { type: Number, required: true }
    }
  },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);