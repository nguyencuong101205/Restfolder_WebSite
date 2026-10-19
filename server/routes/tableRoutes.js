import express from 'express';
import { TableController } from '../controllers/tableController.js';

const router = express.Router();

// Get all tables
router.get('/', TableController.getTables);

// Get single table info
router.get('/:tableNumber', TableController.getTableByNumber);

// Get QR Code for a specific table
router.get('/:tableNumber/qr', TableController.getTableQr);

// Get QR Codes for all tables (for batch printing)
router.get('/all/with-qr', TableController.getAllTablesWithQr);

export default router;
