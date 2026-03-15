const mongoose = require("mongoose");
const Claim = require("../models/claimModel");
const Item = require("../models/itemModel");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const { notifyUser } = require("../utils/socket");

const isAdmin = (user) => user && user.role === "admin";

const canManageItem = (item, user) => {
  if (!item || !user) {
    return false;
  }

  return item.user.toString() === user._id.toString() || isAdmin(user);
};

// POST /api/claims
// Create a new claim for an item
exports.createClaim = async (req, res) => {
  try {
    const { item, proofDescription } = req.body || {};

    if (!item || !proofDescription) {
      return res
        .status(400)
        .json({ message: "item and proofDescription are required" });
    }

    if (!isValidObjectId(item)) {
      return res.status(400).json({ message: "Invalid item id" });
    }

    const existingItem = await Item.findById(item);
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // cannot claim an item you posted yourself
    if (
      req.user &&
      existingItem.user &&
      existingItem.user.toString() === req.user._id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "You cannot claim your own item" });
    }

    // prevent new claims if the item has already been claimed or resolved
    if (existingItem.status && existingItem.status !== "open") {
      return res
        .status(400)
        .json({ message: `Item is not open for claims (status: ${existingItem.status})` });
    }

    const duplicateClaim = await Claim.findOne({
      item,
      claimer: req.user && req.user._id,
    });

    if (duplicateClaim) {
      return res
        .status(400)
        .json({ message: "You already have a claim for this item" });
    }

    const claim = await Claim.create({
      item,
      claimer: req.user && req.user._id,
      proofDescription,
      // status defaults to pending via schema, but set explicitly for clarity
      status: "pending",
    });

    // notify the item owner that a new claim is awaiting verification
    try {
      const io = req.app.get("io");
      if (io && existingItem.user) {
        notifyUser(io, existingItem.user.toString(), "claimPending", {
          claimId: claim._id,
          itemId: item,
          claimer: claim.claimer,
        });
      }
    } catch (err) {
      console.error("Socket notification error (new claim):", err);
    }

    return res.status(201).json(claim);
  } catch (error) {
    console.error("Error creating claim:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/items/:id/claims
// Get all claims for a specific item
exports.getItemClaims = async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!isValidObjectId(itemId)) {
      return res.status(400).json({ message: "Invalid item id" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (!canManageItem(item, req.user)) {
      return res
        .status(403)
        .json({ message: "Not authorized to view claims for this item" });
    }

    const claims = await Claim.find({ item: itemId }).populate(
      "claimer",
      "name email"
    );

    return res.json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/claims/:id/status
// Update the status of a claim
exports.updateClaimStatus = async (req, res) => {
  try {
    const claimId = req.params.id;
    const { status } = req.body || {};

    if (!isValidObjectId(claimId)) {
      return res.status(400).json({ message: "Invalid claim id" });
    }

    const allowedStatuses = ["pending", "approved", "rejected"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Allowed values: pending, approved, rejected",
      });
    }

    const claim = await Claim.findById(claimId).populate("item");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    const item = claim.item;

    if (!canManageItem(item, req.user)) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this claim" });
    }

    // if approving, ensure item is still open before persisting anything
    if (status === "approved" && item) {
      if (item.status && item.status !== "open") {
        return res
          .status(400)
          .json({ message: `Item already ${item.status}, cannot approve another claim` });
      }

      // update item first so we don't leave claim in approved state if item update fails
      item.status = "claimed";
      await item.save();
    }

    claim.status = status;
    await claim.save();

    // notify claimer about status change
    try {
      const io = req.app.get("io");
      if (io && claim.claimer) {
        notifyUser(io, claim.claimer.toString(), "claimStatus", {
          claimId: claim._id,
          status: claim.status,
          itemId: item ? item._id : undefined,
        });
      }
    } catch (err) {
      console.error("Socket notification error (status update):", err);
    }

    return res.json(claim);
  } catch (error) {
    console.error("Error updating claim status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

