// const express = require('express');
import express from 'express';

// const {
//     createInventory,
//     getInventory,
//     getInventorys,
//     deleteInventory,
//     updateInventory
// } = require('../controllers/inventoryController');
import {createInventory, getInventory, getInventorys, deleteInventory, updateInventory} from '../controllers/inventoryController.js'

const router = express.Router();

// GET all inventory items
router.get('/', getInventorys);

// GET a single inventory item
router.get('/:id', getInventory);

// POST a new inventory item
router.post('/', createInventory);

// DELETE an inventory item
router.delete('/:id', deleteInventory);

// UPDATE an inventory item
router.patch('/:id', updateInventory);

// module.exports = router;
export default router;
