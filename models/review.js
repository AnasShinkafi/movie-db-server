const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Number, // TMDb movie ID
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
