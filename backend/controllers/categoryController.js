const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const generateRandomHex = require("../utils/randomGenerator");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { parent } = req.body;
    if (parent) {
      const parentCategory = await Category.findById(parent);
      const level = parentCategory.level + 1;
      const newCategory = await Category.create({
        categoryId: generateRandomHex(),
        ...req.body,
        level,
      });
      parentCategory.children.push(newCategory._id);
      await Promise.all([newCategory.save(), parentCategory.save()]);
      res.json(newCategory);
    } else {
      const newCategory = await Category.create({
        ...req.body,
        categoryId: generateRandomHex(),
      });
      res.json(newCategory);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  const { level } = req.query;
  try {
    const getallCategory = await Category.find(level ? { level } : {}).populate(
      "children"
    );
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findById(id);
    if (deletedCategory.parent) {
      const parentCategory = await Category.findById(deletedCategory.parent);
      parentCategory.children.pull(id);
      await parentCategory.save();
    }
    await Category.deleteMany({ $or: [{ _id: id }, { parent: id }] });
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
