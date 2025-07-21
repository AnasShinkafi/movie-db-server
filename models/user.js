const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Number }],
  watchlist: [{ type: Number }],
}, { timestamps: true });

module.export = mongoose.model('User', userSchema);
 