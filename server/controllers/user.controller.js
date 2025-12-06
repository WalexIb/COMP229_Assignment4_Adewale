/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import User from "../models/user.model.js";

// Create new user
export const create = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List all users
export const list = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID middleware
export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

// Read single user
export const read = (req, res) => {
  res.json(req.user);
};

// Update user by ID
export const update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user by ID
export const remove = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all users
export const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.json({ message: `${result.deletedCount} user(s) deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  create,
  list,
  userByID,
  read,
  update,
  remove,
  removeAll
};
