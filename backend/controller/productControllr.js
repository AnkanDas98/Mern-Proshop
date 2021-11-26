const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");
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

// @desc.....Delete a products...
// @route.....DELETE /api/products/:id...
// @access.....Private/Admin...

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById({ _id: id });

  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc.....Create a products...
// @route.....POST /api/products...
// @access.....Private/Admin...

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    description: "Sample Description",
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc.....Update a products...
// @route.....PUT /api/products/:id...
// @access.....Private/Admin...

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById({ _id: req.params.id });

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc.....Create new review...
// @route.....PUT /api/products/:id/review...
// @access.....Private...

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById({ _id: req.params.id });

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
