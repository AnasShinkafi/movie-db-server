import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Search movies by title
export const searchMovies = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'Query is required' });

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
      },
    });

    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching movies', error: err.message });
  }
};

// Get movie details by ID
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movie details', error: err.message });
  }
};

// Get popular movies
export const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching popular movies', error: err.message });
  }
};
