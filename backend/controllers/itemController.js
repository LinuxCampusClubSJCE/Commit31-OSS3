const Item = require("../models/itemModel");

//CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { type, name, category, description, date, location } = req.body;

    if (!type || !name || !category || !date || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const item = await Item.create({
      type,
      name,
      category,
      description,
      date,
      location,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//GET ITEMS
exports.getItems = async (req, res) => {
  try {
    const { type, status } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//GET ITEM BY ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//UPDATE ITEM STATUS
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      item.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item",
      });
    }

    item.status = status;

    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (
      item.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
