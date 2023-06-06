const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
        type: String,
        required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
    paymentMethod: {},
    orderStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    deliveryDate: {
      type: Date,
    },
    deliveryTime: {
      type: String,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required:true
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);