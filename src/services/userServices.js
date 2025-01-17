// src/Service/userServices.js

const { User } = require("@models/User");

const getAllUsersService = async () => {
  return User.find().select("-password");
};

const getUserByIdService = async (userId) => {
  return User.findById(userId).select("-password");
};

const updateUserService = async (userId, updateData, requestingUser) => {
  // Only allow updating certain fields
  const allowedUpdates = ["name", "email", "role"];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  });

  // If a regular user tries to update the role, ignore it
  if (requestingUser.role !== "Admin") {
    delete updates.role;
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  }).select("-password");
  return user;
};

const updateUserRoleService = async (userId, newRole) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.role = newRole;
  await user.save();

  return user;
};

const deleteUserService = async (userId) => {
  return User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  updateUserRoleService,
  deleteUserService,
};
