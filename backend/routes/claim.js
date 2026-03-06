const express = require("express");
const router = express.Router();

const {
  createClaim,
  getItemClaims,
  updateClaimStatus,
} = require("../controllers/claimController");
const {protect} = require("../middlewares/authMiddleware");

// POST /api/claims
router.post("/claims", protect, createClaim);

// GET /api/items/:id/claims
router.get("/items/:id/claims", protect, getItemClaims);

// PATCH /api/claims/:id/status
router.patch("/claims/:id/status", protect, updateClaimStatus);

module.exports = router;

