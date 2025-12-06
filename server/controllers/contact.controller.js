/* File: server.js
Student: Adewale Ibrahim
StudentID: 301515732
Date: 2025-09-15
*/

import Contact from "../models/contact.model.js";

// Create contact
export const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List all contacts
export const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware: get contact by ID
export const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    req.contact = contact;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid contact ID" });
  }
};

// Read single contact
export const read = (req, res) => {
  res.json(req.contact);
};

// Update contact by ID
export const update = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.contact._id, req.body, { new: true });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete contact by ID
export const remove = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.contact._id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all contacts
export const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany();
    res.json({ message: `${result.deletedCount} contact(s) deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  create,
  list,
  contactByID,
  read,
  update,
  remove,
  removeAll
};
