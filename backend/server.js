const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const productRouter = require("./routes/product");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./routes/uploadRoutes");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/config/stripe", (req, res) => {
  res.send(process.env.STRIPE_PUBLISHER_KEY);
});
const dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/build")));
  app.get("*", (req, res, next) =>
    res.sendFile(
      path.resolve(dirname, "frontend", "build", "index.html").normalize()
    )
  );
} else {
  app.get("/", (req, res, next) => {
    res.send("Api is running.....");
  });
}

app.use(notFound);

app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(Port || 5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${Port}`);
});
