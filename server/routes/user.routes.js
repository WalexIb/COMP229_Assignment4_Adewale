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

// Protected POST /api/users - Only authenticated users can create more users
router.route("/").post(authenticationToken, userCtrl.create);

// Get list of users - protected - Only authoried users can list users
router.route("/").get(authenticationToken, userCtrl.list);

// Delete all users - protected - Only authorized users can delete all users
router.route("/").delete(authenticationToken, userCtrl.removeAll);

// Protected CRUDE on specific user by ID
router.param("userId", userCtrl.userByID);
router.route("/:userId").get(authenticationToken, userCtrl.read);

// Update user - protected (Not part of the assignment, I just feel like adding it
router.route("/:userId").put(authenticationToken, userCtrl.update);

// Delete user - protected
router.route("/:userId").delete(authenticationToken, userCtrl.remove);

export default router;





// import express from "express";
// import userCtrl from "../controllers/user.controller.js";

// // Create router
// const router = express.Router();

// // CRUD routes
// router.route("/api/users").post(userCtrl.create);
// router.route("/api/users").get(userCtrl.list);
// router.route("/api/users").delete(userCtrl.removeAll); // delete all users

// router.param("userId", userCtrl.userByID);

// router.route("/api/users/:userId").get(userCtrl.read);
// router.route("/api/users/:userId").put(userCtrl.update);
// router.route("/api/users/:userId").delete(userCtrl.remove);

// export default router;
