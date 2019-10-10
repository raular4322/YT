const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  platform: { type: String, required: true },
  chestDesing: { type: String, required: true },
  cardDesing: { type: String, required: true },
  cards: { type: Array, default: [] },
  notifications: { type: String, required: true },
  nickname: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
