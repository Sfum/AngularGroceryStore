const express = require("express");
const app = express();

const supplierRoute = express.Router();
let Supplier = require("../model/supplier");

// Add Supplier
supplierRoute.route("/add-supplier").post((req, res, next) => {
  Supplier.create(req.body, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get all Supplier
supplierRoute.route("/").get((req, res) => {
  Supplier.find((error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Get Supplier
supplierRoute.route("/supplier-detail/:id").get((req, res) => {
  Supplier.findById(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

// Update Supplier
supplierRoute.route("/update-supplier/:id").put((req, res, next) => {
  Supplier.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return error;
      } else {
        res.json(data);
        console.log("Supplier updated successfully!");
      }
    }
  );
});

// Delete Supplier
supplierRoute.route("/delete-supplier/:id").delete((req, res, next) => {
  Supplier.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = supplierRoute;
