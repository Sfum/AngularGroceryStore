const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
    {
        id: {
            type: Number,
        },
        category_name: {
            type: String,
        },
        category_description: {
            type: String,
        },
        category_image: {
            type: String,
        }
    }
);

module.exports = mongoose.model("Category", Category);

