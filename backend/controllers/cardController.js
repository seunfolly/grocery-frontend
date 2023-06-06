const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Card = require("../models/cardModel");

const addCard = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const card = await Card.create({ ...req.body, owner: _id });
    res.json({ ...card.toJSON(), cardNumber: card.formattedCardNumber });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(id);

  try {
    const updateCard = await Card.findOneAndUpdate(
      { _id: id, owner: _id },
      req.body,
      {
        new: true,
      }
    );
    res.json({
      ...updateCard.toJSON(),
      cardNumber: updateCard.formattedCardNumber,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getCards = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const userCards = await Card.find({ owner: _id });
    res.json(
      userCards.map((card) => ({
        ...card.toJSON(),
        cardNumber: card.formattedCardNumber,
      }))
    );
  } catch (error) {
    throw new Error(error);
  }
});

const getCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({message: "Card not found"})
    res.json({ ...card.toJSON(), cardNumber: card.formattedCardNumber });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(id);
  validateMongoDbId(_id);

  try {
    const card = await Card.findOneAndDelete({ _id: id, owner: _id });
    if (!card) return res.status(404).json({message: "Card not found"})

    res.json({ ...card.toJSON(), cardNumber: card.formattedCardNumber });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addCard,
  getCards,
  updateCard,
  getCard,
  deleteCard,
};
