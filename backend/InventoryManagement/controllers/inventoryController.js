// const Inventory = require("../models/inventoryModel");
import Inventory from "../models/inventoryModel.js";

// Get all inventory items
const getInventorys = async (req, res) => {
  try {
    const inventorys = await Inventory.find({}).sort({ createdAt: -1 });
    res.status(200).json(inventorys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single inventory item
const getInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ error: "No such inventory" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new inventory item
const createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an inventory item
const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findOneAndDelete({ _id: id });
    if (!inventory) {
      return res.status(404).json({ error: "No such inventory" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an inventory item
const updateInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!inventory) {
      return res.status(404).json({ error: "No such inventory" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search inventory items by title
const searchInventory = async (req, res) => {
  const { title } = req.query;
  try {
    const inventory = await Inventory.find({
      title: { $regex: title, $options: "i" },
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sort inventory items by quantity
const sortInventoryByQuantity = async (req, res) => {
  try {
    const inventorys = await Inventory.find({}).sort({ quantity: 1 });
    res.status(200).json(inventorys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sort inventory items by expiration date
const sortInventoryByExpDate = async (req, res) => {
  try {
    const inventorys = await Inventory.find({}).sort({ expdate: 1 });
    res.status(200).json(inventorys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = {
//     getInventorys,
//     getInventory,
//     createInventory,
//     deleteInventory,
//     updateInventory,
//     updateInventory,
//     searchInventory,
//     sortInventoryByQuantity,
//     sortInventoryByExpDate
// };

export {
  getInventorys,
  getInventory,
  createInventory,
  deleteInventory,
  updateInventory,
  searchInventory,
  sortInventoryByQuantity,
  sortInventoryByExpDate,
};
