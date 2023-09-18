const express = require("express");
const app = express();

const productRoute = express.Router();
let Product = require("../model/product");

// Add Product
productRoute.route("/add-product").post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get all Product
productRoute.route("/").get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get Product
productRoute.route("/product/:id").get((req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Update Product
productRoute.route("/update-product/:id").put((req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return error;
        console.log(error);
      } else {
        res.json(data);
        console.log("Product updated successfully!");
      }
    }
  );
});

// Delete Product
productRoute.route("/delete-product/:id").delete((req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = productRoute;
