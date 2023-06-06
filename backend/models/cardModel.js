const mongoose = require("mongoose"); 

var cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
    lowercase: true,
  },
  expDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true });

cardSchema.virtual('formattedCardNumber').get(function() {
    // Replace all but the last 4 digits with asterisks
    const lastFourDigits = this.cardNumber.slice(-4);
    const maskedDigits = '*'.repeat(this.cardNumber.length - 4);
    return maskedDigits + lastFourDigits;
  });

module.exports = mongoose.model("Card", cardSchema);
