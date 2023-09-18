const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
  {
    id: {
      type: Number,
    },

    _id: {
      type: String,
    },


    category_name: {
      type: String,
    },
  }
);

module.exports = mongoose.model("Category", Category);

