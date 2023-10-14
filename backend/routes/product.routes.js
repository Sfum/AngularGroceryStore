const express = require("express");
const app = express();

const productRoute = express.Router();
let Product = require("../model/product");

const executeAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Add Product
productRoute.route("/add-product").post(
  executeAsync(async (req, res) => {
    try {
      const data = await Product.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get all Product
productRoute.route("/").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Product.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get Product
productRoute.route("/product/:id").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Product.findById(req.params.id);
      if (!data) {
        res.status(404).json({ msg: "Product not found" });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Update Product
productRoute.route("/update-product/:id").put(
  executeAsync(async (req, res) => {
    try {
      const data = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!data) {
        res.status(404).json({ msg: "Product not found" });
      } else {
        res.json(data);
        console.log("Product updated successfully!");
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Delete Product
productRoute.route("/delete-product/:id").delete(
  executeAsync(async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndRemove(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }

      res.status(200).json({
        msg: "Product deleted successfully",
        deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

module.exports = productRoute;
