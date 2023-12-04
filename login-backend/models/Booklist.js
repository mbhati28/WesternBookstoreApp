// models/Booklist.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  googleBookId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: false}
});

const booklistSchema = new mongoose.Schema({
  userId: { type: String,  required: true },
  name: {type: String, required: true},
  username: { type: String, required: true },
  books: [bookSchema],
  isPrivate: {
    type: Boolean,
    default: true,
  },
  description:{type:String, default: " ", required:false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booklist', booklistSchema);
