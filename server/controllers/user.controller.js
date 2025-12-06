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
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // User model handles password hashing
    const user = new User({ username, password });
    const newUser = await user.save();
    
    // Return success response
    res.status(201).json({ message: "User registered successfully.", 
      user: { username: newUser.username, id: newUser._id } 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ message: "Server error during registration" });
  }
};

// POST /api/users/login - Login and obtain JWT token
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
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
      role: user.role || 'admin' // Default to 'admin' if role not set
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Return token
    res.json({ token: token, message: "Login successful.", expiresIn: '1h' });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Basic CRUD Methods
export const create = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json({
      message: "User created successfully.",
      user: { username: newUser.username, id: newUser._id }
    });
  } catch (err) {
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
    res.status(400).json({ message: "Invalid user ID" });
  }
};

// Read single user
export const read = (req, res) => {
  req.profile.password = undefined; // Exclude password
  res.json(req.profile);  
};

// Update user by ID
export const update = async (req, res) => {
  try {
    const updatedUser = req.profile;

    // Apply updates
    Object.assign(updatedUser, req.body);
    userToUpdate.updated = Date.now();

    const savedUser = await updatedUser.save();

    // Exclude password from response
    savedUser.password = undefined;
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user by ID
export const remove = async (req, res) => {
    try {
        // Use the user object attached by userByID middleware (req.profile)
        const user = req.profile;
        const deletedUser = await user.deleteOne(); // Use deleteOne() on the Mongoose document

        // if (!deletedUser) return res.status(404).json({ message: "User not found" }); // Not needed, as userByID guarantees existence

        res.json({ message: `${deletedUser.username} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete all users
export const removeAll = async (req, res) => {
    // This is now protected by the authenticateToken middleware
    try {
        const result = await User.deleteMany();
        res.json({ message: `${result.deletedCount} user(s) deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Updated Export ---
export default {
    register, // New
    login,    // New
    create,
    list,
    userByID,
    read,
    update,
    remove,
    removeAll
};








// // Create new user
// export const create = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // List all users
// export const list = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get user by ID middleware
// export const userByID = async (req, res, next, id) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid user ID" });
//   }
// };

// // Read single user
// export const read = (req, res) => {
//   res.json(req.user);
// };

// // Update user by ID
// export const update = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete user by ID
// export const remove = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user._id);
//     if (!deletedUser) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete all users
// export const removeAll = async (req, res) => {
//   try {
//     const result = await User.deleteMany();
//     res.json({ message: `${result.deletedCount} user(s) deleted successfully` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export default {
//   create,
//   list,
//   userByID,
//   read,
//   update,
//   remove,
//   removeAll
// };
