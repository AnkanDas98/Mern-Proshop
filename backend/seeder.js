const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");

const User = require("./models/userModels");
const Product = require("./models/productModels");
const Order = require("./models/orderModels");

const users = require("./data/users");
const products = require("./data/products");
const { createIndexes } = require("./models/userModels");

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUsers = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUsers };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(`Error Seeding: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(`Error Destroy Seeding: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
