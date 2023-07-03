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
        image: String,
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cash", "voucher", "card"],
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
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
    paidAt: {
     type: Date,
    },
    isPaid: {
     type: Boolean,
     default: false
    },
    totalPrice: {
      type: Number,
      required: true,
      
    },
    orderDate: {
      type: Date,
      default: Date.now()
    },
    comment: {
      type: String,

    },
    reference: {
      type: String,

    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);