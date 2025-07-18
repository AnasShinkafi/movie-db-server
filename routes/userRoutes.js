import express from 'express';
import protect from './middlewares/authMiddleware.js';
import {
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
  getUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);

router.post('/favorites', protect, addFavorite);
router.delete('/favorites', protect, removeFavorite);

router.post('/watchlist', protect, addToWatchlist);
router.delete('/watchlist', protect, removeFromWatchlist);
// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      name: user.name,
      email: user.email,
      favorites: user.favorites,
      watchlist: user.watchlist,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});
export default router;
