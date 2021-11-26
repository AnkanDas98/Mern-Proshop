const { ObjectId } = require("bson");
const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModels");

// @desc.....Create New Order...
// @route.....POST api/orders...
// @access.....Private...

exports.getOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      payment,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc.....Create Order By Id...
// @route.....GET api/orders/:id...
// @access.....Private...

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc.....Create Update Order to Paid...
// @route.....GET api/orders/:id/pay...
// @access.....Private...

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidtAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc.....Get loged in user order...
// @route.....GET api/orders/myorders...
// @access.....Private...

exports.getMyOrders = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc.....Get all order...
// @route.....GET api/orders...
// @access.....Private/Admin...

exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate("user", "_id name");
  res.status(200).json(orders);
});

// @desc.....Create Update Order to Delivered...
// @route.....PUT api/orders/:id/deliver...
// @access.....Private/Admin...

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.isDeliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
