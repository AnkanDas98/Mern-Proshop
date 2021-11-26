const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const generateToken = require("../util/generateToken");

// @desc.....Auth user & get token...
// @route.....POST api/users/login...
// @access.....Public...

exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Passwor");
  }
});

// @desc.....Auth user profile...
// @route.....GET api/users/profile...
// @access.....Private...

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc.....Update user profile...
// @route.....PUT api/users/profile...
// @access.....Private...

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc.....Register a new user...
// @route.....POST api/users...
// @access.....Public...

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @desc.....Get All Users...
// @route.....GET api/users...
// @access.....Private/Admin...

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not Found");
  }
});

// @desc.....Delete a User...
// @route.....DELETE api/users/:id...
// @access.....Private/Admin...

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.deleteOne({ _id: userId });
    res.json({ messgae: "User removed" });
  } catch (error) {
    res.status(404);
    throw new Error("Users not Found");
  }
});

// @desc.....Get User By Id...
// @route.....Get api/users/:id...
// @access.....Private/Admin...

exports.getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById({ _id: userId }).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("No User Found!");
  }
});

// @desc.....Update user ...
// @route.....PUT api/users/:id...
// @access.....Private/Admin...

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
