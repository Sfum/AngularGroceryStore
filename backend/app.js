const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//////
const atlasUri = "mongodb+srv://sektor1:UlqvAbWBUHUEN1JZ@sektor2.hvhskib.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

const productRoute = require("./routes/product.routes");
const categoryRoute = require("./routes/category.routes");
const supplierRoute = require("./routes/supplier.routes");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Static directory path
app.use(
  express.static(path.join(__dirname, "dist/"))
);

// API root
app.use("/", productRoute);
app.use("/category", categoryRoute);
app.use("/supplier", supplierRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// 404 Handler
app.use((req, res, next) => {
  next(404);
});

// Base Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/index.html")
  );
});

