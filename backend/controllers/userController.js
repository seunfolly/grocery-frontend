const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const sendEmail = require("./emailContoller");
const { v4: uuidv4 } = require("uuid");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");


const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      _id: newUser?._id,
      fullName: newUser?.fullName,
      role: newUser?.role,
      dob: newUser?.dob,
      email: newUser?.email,
      phone: newUser?.phone,
      orders: newUser?.orderCount,
      image: newUser?.image.url,
      token: generateToken(newUser?._id),
    });
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    res.status(409);
    throw new Error("User Already Exists");
  }
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { emailOrPhone, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      fullName: findUser?.fullName,
      role: findUser?.role,
      dob: findUser?.dob,
      email: findUser?.email,
      phone: findUser?.phone,
      orders: findUser?.orderCount,
      image: findUser?.image.url,
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found with this email");
    error.statusCode = 404;
    throw error;
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8080/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getLoggedInUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id, "-updatedAt -createdAt -__v");
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  
  try {
    const user = await User.findById(_id)
    const updateObject = { ...req.body };
    if (req.images) {
      updateObject.image = req.images[0];
      await cloudinaryDeleteImg(user.image.public_id);
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,

      updateObject,

      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    if (!getaUser) {
      const error = new Error("User not found with this email");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName: req?.body?.fullName,
        email: req?.body?.email,
        phone: req?.body?.phone,
        dob: req?.body?.dob,
        image: req?.body?.image,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  console.log("l");
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  // console.log(req.body)
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);

    // Check if the user already has a cart and remove it
    const alreadyExistCart = await Cart.findOne({ orderBy: user._id });
    if (alreadyExistCart) {
      const a = await Cart.deleteOne({ _id: alreadyExistCart._id });
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.id = cart[i].id;
      object.count = cart[i].count;
      let getProduct = await Product.findById(cart[i].id)
        .select("regularPrice salePrice")
        .exec();
      object.price = getProduct.salePrice || getProduct.regularPrice;
      object.name = getProduct.name;
      object.total = cart[i].total;
      object.image = cart[i].image;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderBy: _id }).populate("products.id");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderBy: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const createOrder = asyncHandler(async (req, res) => {
  const { COD, address, deliveryDate, deliveryTime } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderBy: user._id });
    let finalAmout = userCart.cartTotal;

    const orderId = uuidv4();

    let newOrder = await new Order({
      orderId: orderId,
      products: userCart.products,
      paymentMethod: {
        id: orderId,
        method: "COD",
        amount: finalAmout,
        created: Date.now(),
        currency: "ngn",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
      address,
      deliveryDate,
      deliveryTime,
    }).save();

    user.orderCount += 1;
    await user.save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { stock: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.find({ orderBy: _id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findById({ _id: id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.find({ orderBy: id })
      .populate("products.product")
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  getLoggedInUserProfile,
  updatedUserProfile,
  getAUser,
  deleteAUser,
  updateAUser,
  getAllUser,
  forgotPasswordToken,
  resetPassword,
  getWishlist,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getUserOrders,
  updateOrderStatus,
};
