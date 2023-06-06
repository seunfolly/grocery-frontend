const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    image: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    level: { type: Number, default: 1 },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
