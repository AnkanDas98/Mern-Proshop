const Product = require("../models/productModels");

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
};

exports.getSingleProducts = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
};
