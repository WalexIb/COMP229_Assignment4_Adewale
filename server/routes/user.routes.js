/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authenticationToken from "../middlewares/auth.js";

// Create router
const router = express.Router();

// Unprotected Auth endpoints to allow new user registration and obtaining JWT token
// POST /api/users/register - Register a new user
router.route("/register").post(userCtrl.register);
// POST /api/users/login - Login and obtain JWT token
router.route("/login").post(userCtrl.login);
// POST /api/users/logout - Logout user (for client-side token discard)
router.route("/logout").post(userCtrl.logout);

// Protected POST /api/users - Only authenticated users can create more users
router.route("/").post(authenticationToken, userCtrl.create);

// Get list of users - protected - Only authoried users can list users
router.route("/").get(authenticationToken, userCtrl.list);

// Delete all users - protected - Only authorized users can delete all users
router.route("/").delete(authenticationToken, userCtrl.removeAll);

// Protected CRUDE on specific user by ID
router.param("userId", userCtrl.userByID);
// Update user - protected 
router.route("/:userId")
    .put(authenticationToken, userCtrl.update)
    .get(authenticationToken, userCtrl.read)
    .delete(authenticationToken, userCtrl.remove);

export default router;