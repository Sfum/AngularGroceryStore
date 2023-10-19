const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Supplier = new Schema(
  {
    id: {
      type: Number,
    },
    supplier_name: {
      type: String,
    },
    supplier_description: {
      type: String,
    },
  }
);

module.exports = mongoose.model("Supplier", Supplier);
