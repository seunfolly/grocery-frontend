// const Product = require("../models/productModel");
// const User = require("../models/userModel");
// const Cart = require("../models/cartModel");
// const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");
// const validateMongoDbId = require("../utils/validateMongodbId");

// const getCart = asyncHandler(async (req, res) => {
//   const user = req.user;
//   try {
//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "products.product"
//     );
//     if (!cart) {
//       return res.json({ cart: null });
//     }
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const addProductToCart = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   const user = req.user;
//   const count = 1;
//   try {
//     const product = await Product.findById(id);
//     if (!product) return res.status(404).json({message:"Product not found"});
//     const cart = await Cart.findOne({ user: user._id });
//     if (cart) {
//       const index = cart.products.findIndex(
//         (item) => item.product.toString() === id.toString()
//       );
//       if (index !== -1) {
//         cart.products[index].count += count;
//       } else {
//         cart.products.push({
//           product: id,
//           count,
//           price: product.price,
//         });
//       }
//       cart.cartTotal += product.price * count;
//       await cart.save();
//       res.json(cart);
//     } else {
//       const newCart = await Cart.create({
//         user: user._id,
//         products: [{ product: id, count, price: product.price }],
//         cartTotal: product.price * count,
//       });
//       res.json(newCart);
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const decreaseCount = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   const user = req.user;
//   try {
//     const product = await Product.findById(id);
//     if (!product) return res.status(404).json({message:"Product not found"});
//     const cart = await Cart.findOne({ user: user._id });
//     const index = cart.products.findIndex(
//       (item) => item.product.toString() === id.toString()
//     );

//     if (index !== -1) {
//       const product = cart.products[index];
//       if (product.count === 1) {
//         cart.products.splice(index, 1);
//       } else {
//         product.count--;
//       }
//       cart.cartTotal -= product.price;
//       await cart.save();
//     }
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const removeProductFromCart = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   const user = req.user;
//   try {
//     const product = await Product.findById(id);
//     if (!product) return res.status(404).json({message:"Product not found"});
//     const cart = await Cart.findOne({ user: user._id });
//     const index = cart.products.findIndex(
//       (item) => item.product.toString() === id.toString()
//     );
//     if (index === -1) {
//       return res.status(404).json({message:"Product not found"});
//     }

//       const deletedProduct = cart.products[index];
//     cart.products.splice(index, 1);
//     cart.cartTotal -= deletedProduct.price * deletedProduct.count;
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// module.exports = {
//   getCart,
//   addProductToCart,
//   decreaseCount,
//   removeProductFromCart,
// };
