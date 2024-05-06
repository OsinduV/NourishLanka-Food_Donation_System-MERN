// const Inventory = require("../models/inventoryModel");
import Inventory from "../models/inventoryModel.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';

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
  const { title, location } = req.query;
  try {
    const inventory = await Inventory.find({
      $or: [
        { title: { $regex: title, $options: "i" } },
        { location: { $regex: location, $options: "i" } }
      ]
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

const generateInventoryReport = async (req, res) => {
  try {
    // Fetch all inventory items from the database
    const inventorys = await Inventory.find({}).sort({ createdAt: -1 });

    // Find the maximum and minimum quantities
    const maxQuantityItem = inventorys.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current);
    const minQuantityItem = inventorys.reduce((prev, current) => (prev.quantity < current.quantity) ? prev : current);

    // Create a new PDF document
    const doc = new PDFDocument();
    const fileName = 'inventory_report.pdf'; // File name

    // Pipe the PDF output to the response
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf')

    // Add title to the PDF
    doc.fontSize(20).text('Inventory Report', { align: 'center' }).moveDown();

    // Set up page border
    doc.lineWidth(2).rect(50, 50, 500, 700).stroke(); // Border around the content area

    // Add maximum quantity item to the PDF
    doc.fontSize(12).text('Maximum Quantity(KG) Item:', { continued: true }).text(`Title: ${maxQuantityItem.title}, Quantity: ${maxQuantityItem.quantity}`).moveDown();

    // Add minimum quantity item to the PDF
    doc.text('Minimum Quantity(KG) Item:', { continued: true }).text(`Title: ${minQuantityItem.title}, Quantity: ${minQuantityItem.quantity}`).moveDown();

    // Add table headers
    doc.fontSize(12).fillColor('#000').text('Title', 50, 200, { bold: true }).text('Quantity (KG)', 200, 200, { bold: true })
      .text('Location', 300, 200, { bold: true }).text('Exp. Date', 410, 200, { bold: true });

    // Add inventory items to the table
    inventorys.forEach((inventory, index) => {
      const y = 220 + index * 20; // Calculate vertical position
      doc.rect(50, y - 10, 500, 20).fillAndStroke('#f3f3f3', '#000'); // Add background color and border for each row
      doc.fillColor('#000').text(inventory.title, 50, y).text(inventory.quantity.toString(), 200, y)
        .text(inventory.location, 300, y).text(inventory.expdate.toDateString(), 410, y);
    });

    // Add summary and overview sections
    const totalItems = inventorys.length;
    doc.moveDown().text(`Total Items: ${totalItems}`, { align: 'center' }).moveDown();

    // Finalize the PDF
    doc.pipe(res);
    doc.end();

  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
  generateInventoryReport,
};
