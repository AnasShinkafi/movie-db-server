const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Review = require('./models/Review');

// POST /api/reviews
router.post('/', authMiddleware, async (req, res) => {
  const { movieId, movieTitle, rating, comment } = req.body;

  try {
    const existingReview = await Review.findOne({
      user: req.user.id,
      movieId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie.' });
    }

    const review = new Review({
      user: req.user.id,
      movieId,
      movieTitle,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

// GET /api/reviews/:movieId
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load reviews' });
  }
});

module.exports = router;
