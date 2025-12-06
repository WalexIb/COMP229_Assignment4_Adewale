/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

// CRUD routes
router.route("/api/contacts").post(contactCtrl.create);
router.route("/api/contacts").get(contactCtrl.list);
router.route("/api/contacts").delete(contactCtrl.removeAll); // delete all contacts

router.param("contactId", contactCtrl.contactByID);

router.route("/api/contacts/:contactId").get(contactCtrl.read);
router.route("/api/contacts/:contactId").put(contactCtrl.update);
router.route("/api/contacts/:contactId").delete(contactCtrl.remove);

export default router;
