const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");
const crypto = require("crypto");

function generateRandomHex() {
  const buffer = crypto.randomBytes(4);
  return "#" + buffer.toString("hex");
}

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    console.log(req.images);
    const newProduct = await Product.create({
      ...req.body,
      productId: generateRandomHex(),
      images: req.images,
    });
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body.tags);
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    let updatedData = req.body;
    if (req.body.name) updatedData.slug = slugify(req.body.name);
    const product = await Product.findById(id);
    const existingImages = product.images;
    if (req.images && req.images.length > 0) {
      const allImages = [
        ...req.images.map((image) => ({
          public_id: image.public_id,
          url: image.url,
        })),
      ];
      updatedData.images = allImages;
    } else {
      updatedData.images = existingImages;
    }
    const removedImages = existingImages.filter(
      (existingImage) =>
        !updatedData.images.some(
          (updatedImage) => updatedImage.public_id === existingImage.public_id
        )
    );
    for (const removedImage of removedImages) {
      await cloudinaryDeleteImg(removedImage.public_id);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const product = await Product.findById(id);
    console.log(product._id);
    const imagesToDelete = product.images;
    for (const image of imagesToDelete) {
      await cloudinaryDeleteImg(image.public_id);
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id)
      .populate("category")
      .populate("brand")
      .populate("ratings.postedby");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "minPrice",
      "maxPrice",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    if (req.query.name) {
      queryObj.name = { $regex: req.query.name, $options: "i" };
    }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Filter by category id
    const categoryId = req.query.categoryId;
    if (categoryId) {
      query = query.where("category").equals(categoryId);
    }

    // Filter by brand id
    const brandId = req.query.brandId;
    if (brandId) {
      query = query.where("brand").equals(brandId);
    }

    //Filter by Rating 
    const rating = req.query.rating
    if(rating) {
      query = query.find({
        ratings: { $elemMatch: { star: rating } },
      });
    }
    // Filter by maxPrice and/or minPrice
    const maxPrice = req.query.maxPrice;
    const minPrice = req.query.minPrice;
    
    if (maxPrice && minPrice) {
      query = query.or([
        { regularPrice: { $gte: minPrice, $lte: maxPrice } },
        { salePrice: { $gte: minPrice, $lte: maxPrice } }
      ]);
    } else if (maxPrice) {
      query = query.or([
        { regularPrice: { $lte: maxPrice } },
        { salePrice: { $lte: maxPrice } }
      ]);
    } else if (minPrice) {
      query = query.or([
        { regularPrice: { $gte: minPrice } },
        { salePrice: { $gte: minPrice } }
      ]);
    }

    // Sorting
    if (req.query.sort) {
    const { sort } = req.query;
    let sortBy = "-createdAt";
    if (sort === "relevance") {
      //TODO::::: Add relevance sorting logic based on your app's requirements
    } else if (sort === "date") {
      sortBy = "-createdAt";
    } else if (sort === "price_low_high") {
      sortBy = "salePrice regularPrice";
    } else if (sort === "price_high_low") {
      sortBy = "-salePrice -regularPrice";
    }
    query = query.sort(sortBy);
    }
    
    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    query = query.populate("category").populate("brand");

    const products = await query;
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const searchProduct = asyncHandler(async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment } = req.body;
  const { prodId } = req.params;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.some((wishlistId) =>
      wishlistId.equals(id)
    );
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: id },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: id },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  rating,
  addToWishlist,
};
