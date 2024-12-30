// src/controllers/userController.js

const {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = require("@services/userServices");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const updatedUser = await updateUserService(
      req.params.id,
      req.body,
      req.user
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    await deleteUserService(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  updateUserController,
  deleteUserController,
};
