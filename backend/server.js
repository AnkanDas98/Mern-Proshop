const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const productRouter = require("./routes/product");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res, next) => {
  res.send("Api is running.....");
});

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

const Port = process.env.PORT || 5000;

app.listen(Port || 5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${Port}`);
});
