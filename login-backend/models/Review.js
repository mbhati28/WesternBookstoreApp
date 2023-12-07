const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  booklistId: { type: String, required: true },
  userId: { type: String, required: true },
  username:{type:String, required: false},
  text: { type: String, required: true },
  isHidden: {type:Boolean, default:false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
