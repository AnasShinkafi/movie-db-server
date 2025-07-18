import User from "../models/userr";

// Add to favorites
export const addFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = req.user;

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add favorite', error: err.message });
  }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = req.user;
    user.favorites = user.favorites.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove favorite', error: err.message });
  }
};

// Add to watchlist
export const addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = req.user;

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({ message: 'Added to watchlist', watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to watchlist', error: err.message });
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = req.user;
    user.watchlist = user.watchlist.filter((id) => id !== movieId);
    await user.save();

    res.json({ message: 'Removed from watchlist', watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove from watchlist', error: err.message });
  }
};

// Get user profile (favorites & watchlist)
export const getUserProfile = async (req, res) => {
  const user = req.user;
  res.json({
    username: user.username,
    email: user.email,
    favorites: user.favorites,
    watchlist: user.watchlist,
  });
};
