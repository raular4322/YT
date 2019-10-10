const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  design: { type: String, required: true },
  img: { type: String, required: true },
  youtuber: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model('Card', cardSchema);
