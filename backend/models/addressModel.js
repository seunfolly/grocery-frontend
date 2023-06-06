const mongoose = require("mongoose"); 

var addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Address", addressSchema);
