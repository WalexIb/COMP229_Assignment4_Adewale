/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

export default mongoose.model("User", UserSchema);
