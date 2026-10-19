import express from 'express';
import { OrderController } from '../controllers/orderController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Customer: Place order for a table
router.post('/', OrderController.createOrder);

// Customer: Check active order status for their table
router.get('/table/:tableNumber/active', OrderController.getActiveTableOrder);

// Customer: Call staff from their order
router.post('/:id/call-staff', OrderController.callStaff);

// Protected: Staff, Kitchen, Admin can view all orders
router.get('/', authenticateJWT, authorizeRoles('admin', 'kitchen', 'waiter'), OrderController.getAllOrders);

// Protected: Kitchen / Staff can update order status
router.patch('/:id/status', authenticateJWT, authorizeRoles('admin', 'kitchen', 'waiter'), OrderController.updateOrderStatus);

export default router;
