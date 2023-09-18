const express = require("express");
const app = express();

const categoryRoute = express.Router();
let Category = require("../model/category");

// Add Category
categoryRoute.route("/add-category").post((req, res, next) => {
  Category.create(req.body, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get all Category
categoryRoute.route("/").get((req, res) => {
  Category.find((error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get Category
categoryRoute.route("/category-detail/:id").get((req, res) => {
  Category.findById(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Update Category
categoryRoute.route("/update-category/:id").put((req, res, next) => {
  Category.findByIdAndUpdate(
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
        console.log("Category updated successfully!");
      }
    }
  );
});

// Delete Category
categoryRoute.route("/delete-category/:id").delete((req, res, next) => {
  Category.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = categoryRoute;
