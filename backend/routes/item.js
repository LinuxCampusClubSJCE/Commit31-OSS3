const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItemStatus,
  deleteItem,
} = require("../controllers/itemController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/", getItems);
router.get("/:id", getItemById);

router.post("/", protect, createItem);
router.patch("/:id/status", protect, updateItemStatus);
router.delete("/:id", protect, deleteItem);

module.exports = router;
