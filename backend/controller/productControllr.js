const Product = require("../models/productModels");

// @desc.....Fetch all products...
// @route.....GET api/products/:id...
// @access.....Public...

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// @desc.....Fetch Single products...
// @route.....GET api/products...
// @access.....Public...

exports.getSingleProducts = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
};
