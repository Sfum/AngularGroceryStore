const express = require("express");
const app = express();

const categoryRoute = express.Router();
let Category = require("../model/category");

const executeAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Add Category
categoryRoute.route("/add-category").post(
  executeAsync(async (req, res) => {
    try {
      const data = await Category.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get all Category
categoryRoute.route("/").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Category.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get Category
categoryRoute.route("/category-detail/:id").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Category.findById(req.params.id);
      if (!data) {
        res.status(404).json({ msg: "Category not found" });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Update Category
categoryRoute.route("/update-category/:id").put(
  executeAsync(async (req, res) => {
    try {
      const data = await Category.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!data) {
        res.status(404).json({ msg: "Category not found" });
      } else {
        res.json(data);
        console.log("Category updated successfully!");
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Delete Category
categoryRoute.route("/delete-category/:id").delete(
  executeAsync(async (req, res) => {
    try {
      const data = await Category.findByIdAndRemove(req.params.id);
      if (!data) {
        res.status(404).json({ msg: "Category not found" });
      } else {
        res.status(200).json({
          msg: "Category deleted successfully",
          deletedCategory: data,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

module.exports = categoryRoute;
