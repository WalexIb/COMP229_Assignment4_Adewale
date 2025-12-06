/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: String
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

export default mongoose.model("Contact", ContactSchema);
