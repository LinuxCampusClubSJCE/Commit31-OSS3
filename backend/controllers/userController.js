const User = require("../models/userModel");

// Get current logged in user profile
// GET /api/users/me
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactNumber: user.contactNumber,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile (name and contactNumber)
// PATCH /api/users/profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, contactNumber } = req.body || {};
    console.log(req.body);
    if (name !== undefined) user.name = name;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update email (requires current password)
// PATCH /api/users/email
exports.updateEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { currentPassword, newEmail } = req.body;

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const emailTaken = await User.findOne({ email: newEmail });
    if (emailTaken) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    user.email = newEmail;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Change password (requires current password)
// PATCH /api/users/password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { currentPassword, newPassword } = req.body;

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};