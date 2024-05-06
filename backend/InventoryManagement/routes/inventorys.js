// const express = require('express');
import express from "express";
// const {
//     createInventory,
//     getInventory,
//     getInventorys,
//     deleteInventory,
//     updateInventory,
//     searchInventory,
//     sortInventoryByQuantity,
//     sortInventoryByExpDate
// } = require('../controllers/inventoryController');

import {
  createInventory,
  getInventory,
  getInventorys,
  deleteInventory,
  updateInventory,
  searchInventory,
  sortInventoryByExpDate,
  sortInventoryByQuantity,
  generateInventoryReport,
} from "../controllers/inventoryController.js";

const router = express.Router();

// GET all inventory items
router.get("/", getInventorys);

//Search an item
router.get("/search", searchInventory);

// GET a single inventory item
router.get("/:id", getInventory);

// POST a new inventory item
router.post("/", createInventory);

// DELETE an inventory item
router.delete("/:id", deleteInventory);

// UPDATE an inventory item
router.patch("/:id", updateInventory);

//Sort by quantity
router.get("/sort/quantity", sortInventoryByQuantity);

//Sort by date
router.get("/sort/expdate", sortInventoryByExpDate);

// Generate PDF report route
router.get("/report/reportgen", generateInventoryReport);

// module.exports = router;
export default router;
