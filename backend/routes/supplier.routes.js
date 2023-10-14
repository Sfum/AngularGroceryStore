const express = require("express");
const app = express();

const supplierRoute = express.Router();
let Supplier = require("../model/supplier");

const executeAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Add Supplier
supplierRoute.route("/add-supplier").post(
  executeAsync(async (req, res) => {
    try {
      const data = await Supplier.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get all Supplier
supplierRoute.route("/").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Supplier.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Get Supplier
supplierRoute.route("/supplier-detail/:id").get(
  executeAsync(async (req, res) => {
    try {
      const data = await Supplier.findById(req.params.id);
      if (!data) {
        res.status(404).json({ msg: "Supplier not found" });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Update Supplier
supplierRoute.route("/update-supplier/:id").put(
  executeAsync(async (req, res) => {
    try {
      const data = await Supplier.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!data) {
        res.status(404).json({ msg: "Supplier not found" });
      } else {
        res.json(data);
        console.log("Supplier updated successfully!");
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

// Delete Supplier
supplierRoute.route("/delete-supplier/:id").delete(
  executeAsync(async (req, res) => {
    try {
      const data = await Supplier.findByIdAndRemove(req.params.id);
      if (!data) {
        res.status(404).json({ msg: "Supplier not found" });
      } else {
        res.status(200).json({
          msg: "Supplier deleted successfully",
          deletedSupplier: data,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  })
);

module.exports = supplierRoute;
