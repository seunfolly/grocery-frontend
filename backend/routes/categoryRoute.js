const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controllers/categoryController"); 
const { authMiddleware, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", getallCategory);
router.get("/:id", getCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);


module.exports = router;
