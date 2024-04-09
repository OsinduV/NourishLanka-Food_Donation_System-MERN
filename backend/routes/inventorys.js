const express = require('express');
const {
    createInventory,
    getInventory,
    getInventorys,
    deleteInventory,
    updateInventory,
    searchInventory,
    sortInventoryByQuantity,
    sortInventoryByExpDate
} = require('../controllers/inventoryController');

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

//Search an item
router.get('/search', searchInventory);

//Sort by quantity
router.get('/sort/quantity', sortInventoryByQuantity);

//Sort by date
router.get('/sort/expdate', sortInventoryByExpDate);

module.exports = router;
