/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing and comparison

const UserSchema = new mongoose.Schema(
  {
    // NOTE: Changed 'name' field to 'username' to align with controller logic
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Select: false to exclude by default
    role: { type: String, default: 'user' } // Added role for JWT payload flexibility
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

// --- 1. PRE-SAVE HOOK: Automatic Password Hashing ---
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass error to Mongoose
  }
});

// --- 2. INSTANCE METHOD: Compare Password (The piece your controller needs) ---
/**
 * Compares a candidate password with the stored hashed password.
 * @param {string} candidatePassword - The plain text password from the login request.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
   
  // Since password field is select: false, ensure it's selected before calling this method
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
