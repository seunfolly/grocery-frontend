const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Address = require("../models/addressModel");

const addAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const newAddress = await Address.create({ ...req.body, createdBy: _id });
    res.json(newAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(id);

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, createdBy: _id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedAddress);
  } catch (error) {
    throw new Error(error);
  }
});

const getAddresses = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const userAddresses = await Address.find({ createdBy: _id });
    res.json(userAddresses);
  } catch (error) {
    throw new Error(error);
  }
});

const getAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const address = await Address.findById(id);
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  validateMongoDbId(id);
  validateMongoDbId(_id);

  try {
    const address = await Address.findOneAndDelete({ _id: id, createdBy: _id });
    res.json(address);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addAddress,
  getAddresses,
  updatedAddress,
  getAddress,
  deleteAddress,
};
