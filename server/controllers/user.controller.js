/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

// Get JWT Secret from config
const JWT_SECRET = config.jwtSecret;

// New Authentication Controllers

// Register a new user
export const register = async (req, res) => {
  try {
    // Extract all necessary fields: username, email, password
    const { username, email, password, role } = req.body;

// Check for existing username (or email, better practice!)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: "Username or Email already taken" });
    }

// Pass ALL fields to the User constructor
    const user = new User({ username, email, password, role }); 
    const newUser = await user.save();

    // Return success response (exclude password)
    res.status(201).json({
      message: "User registered successfully.",
      user: { username: newUser.username, email: newUser.email, id: newUser._id }
    });
  } catch (err) {
    console.error("Registration error:", err);
    // Use 500 for server/database errors
    res.status(400).json({ message: "Server error during registration" });
  }
};

// POST /api/users/login - Login and obtain JWT token
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username. Use .select('+password') if it's set to select: false
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare password 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT Playload
    const payload = {
      sub: user._id,
      username: user.username,
      role: user.role || 'admin'
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Return token
    res.json({ token: token, message: "Login successful.", expiresIn: '1h' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// POST /api/users/logout - Logout endpoint (client-side action)
export const logout = (req, res) => {
  // In a stateless JWT system, the client simply discards the token.
  // This endpoint provides a clean success response.
  res.status(200).json({ message: "Logout successful. Client token should be discarded." });
};

// Basic CRUD Methods

// Protected POST /api/users - Create new user (e.g., by admin)
export const create = async (req, res) => {
  try {
    // Password hashing is handled by the pre-save hook on the User model
    const user = new User(req.body);
    const newUser = await user.save();

    // Exclude password from response
    newUser.password = undefined;
    res.status(201).json({
      message: "User created successfully.",
      user: { username: newUser.username, id: newUser._id }
    });
  } catch (err) {
    // Mongoose validation errors often return a 400 status
    res.status(400).json({ message: err.message });
  }
};

// List all users
export const list = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field
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
    req.profile = user; // Attach user to req.profile
    next();
  } catch (err) {
    // ⚠️ Robust Error Handling: Check for Mongoose casting errors
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error processing user ID" });
  }
};

// Read single user
export const read = (req, res) => {
  
  req.profile.password = undefined;
  res.json(req.profile);
};

// Update user by ID
export const update = async (req, res) => {
  try {
    let updatedUser = req.profile; // Get the user attached by userByID

    // Update fields if provided in req.body
    for (const key in req.body) {
      if (req.body[key] !== undefined) {
        updatedUser[key] = req.body[key];
      }
    }

    // Set updated timestamp
    updatedUser.updated = Date.now();

    const savedUser = await updatedUser.save(); // Hashing hook runs if password was in req.body

    // Exclude password from response
    savedUser.password = undefined;
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user by ID
export const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.deleteOne();

    res.json({ message: `${deletedUser.username} deleted successfully` });
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

// --- Export All Controllers ---
export default {
  register,
  login,
  logout, // Added
  create,
  list,
  userByID,
  read,
  update,
  remove,
  removeAll

};