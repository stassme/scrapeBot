const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  link: String,
  picture: String,
  price: String,
  size: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
