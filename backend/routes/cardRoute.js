const express = require("express");
const {
  addCard,
  updateCard,
  deleteCard,
  getCard,
  getCards
} = require("../controllers/cardController");
const { authMiddleware} = require("../middlewares/auth");
const router = express.Router();

router.post("/", authMiddleware, addCard);
router.put("/:id", authMiddleware,updateCard);
router.delete("/:id", authMiddleware, deleteCard); 
router.get("/:id", authMiddleware, getCard);
router.get("/", authMiddleware, getCards);

module.exports = router;
