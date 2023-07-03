const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true, unique: true, index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    level: { type: Number, default: 1 },
    visible: {type: Boolean, default: true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);