const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  id: {
    type: Number,
  },
  product_name: {
    type: String,
  },
  supplierId: {
    type: Number,
  },
  categoryId: {
    type: Number,
  },
  reviewId: {
    type: Number,
  },
  catalogue_number: {
    type: String,
  },
  short_description: {
    type: String,
  },
  long_description: {
    type: String,
  },
  product_image: {
    type: String,
  },
  price: {
    type: String,
  },
  availability: {
    type: String,
  },
  quantity: {
    type: String,
  },
  in_wishlist: {
    type: Boolean,
  },
  in_compare: {
    type: Boolean,
  },
  in_cart: {
    type: Boolean,
  },
  made_in_country: {
    type: String,
  },
  on_sale: {
    type: String,
  },
  climate_friendly: {
    type: String,
  },
  delivery_slot: {
    type: String,
  },
  price_per_weight: {
    type: String,
  },
  diet_type: {
    type: String,
  },
  size: {
    type: String,
  },
  number_of_items: {
    type: String,
  },
  format: {
    type: String,
  },
  type: {
    type: String,
  },
  flavour: {
    type: String,
  },
});

module.exports = mongoose.model("Product", Product);
