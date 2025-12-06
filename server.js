/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-10-09
*/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config.js";
import contactRoutes from "./server/routes/contact.routes.js";
import userRoutes from "./server/routes/user.routes.js";

const app = express();

// Enable CORS for your Vite frontend (port 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes (no prefixes, since they are defined inside the route files)
app.use(contactRoutes);
app.use(userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully");
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
