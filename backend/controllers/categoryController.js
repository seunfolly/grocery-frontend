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
    const query = level ? { level } : {};
    const getallCategory = await Category.find(query).lean();
    const populatePromises = getallCategory.map(populateChildren);
    await Promise.all(populatePromises);
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
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await deleteCategoryAndDescendants(deletedCategory);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id).populate("children parent");
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


const populateChildren = async (category) => {
  const populatedChildren = await Category.find({ parent: category._id }).lean();
  category.children = populatedChildren;

  if (category.children.length > 0) {
    const childPromises = category.children.map(populateChildren);
    await Promise.all(childPromises);
  }
};

async function deleteCategoryAndDescendants(category) {
  // Delete category
  await Category.deleteOne({ _id: category._id });
  // Delete descendants recursively
  for (const childId of category.children) {
    const childCategory = await Category.findById(childId);
    if (childCategory) {
      await deleteCategoryAndDescendants(childCategory);
    }
  }
  // Remove from parent's children array if applicable
  if (category.parent) {
    const parentCategory = await Category.findById(category.parent);
    if (parentCategory) {
      parentCategory.children.pull(category._id);
      await parentCategory.save();
    }
  }
}