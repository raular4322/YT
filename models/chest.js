const mongoose = require('mongoose');

const { Schema } = mongoose;

const chestSchema = new Schema({
  design: { type: String, required: true },
  price: { type: String, required: true },
  youtuber: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model('Chest', chestSchema);
