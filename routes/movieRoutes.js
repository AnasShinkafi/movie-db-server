const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Save movie to user's favorites
router.post('/favorites', authMiddleware, async (req, res) => {
  const { movie } = req.body;
  const userId = req.user.id;

  if (!movie || !movie.id) return res.status(400).json({ message: 'Movie data required' });

  try {
    const user = await User.findById(userId);

    const alreadyExists = user.favorites.some(fav => fav.id === movie.id);
    if (alreadyExists) return res.status(409).json({ message: 'Movie already in favorites' });

    user.favorites.push(movie);
    await user.save();

    res.status(201).json({ message: 'Movie added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Error saving favorite' });
  }
});

// Get user favorites
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ message: 'Search query is required' });

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

// Add to watchlist
router.post('/watchlist', authMiddleware, async (req, res) => {
  const { movie } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    const exists = user.watchlist.find((m) => m.id === movie.id);
    if (exists) return res.status(409).json({ message: 'Already in watchlist' });

    user.watchlist.push(movie);
    await user.save();

    res.status(201).json({ message: 'Added to watchlist', watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
});

// Get watchlist
router.get('/watchlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

// Remove from watchlist
router.delete('/watchlist/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter((m) => m.id != req.params.id);
    await user.save();
    res.json({ message: 'Removed from watchlist', watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from watchlist' });
  }
});


module.exports = router;
