import express from 'express';
import { MenuController } from '../controllers/menuController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Public: Customers scanning QR code can view the menu
router.get('/', MenuController.getAllDishes);
router.get('/:id', MenuController.getDishById);

// Protected: Only Admin can add or delete dishes
router.post('/', authenticateJWT, authorizeRoles('admin'), MenuController.createDish);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), MenuController.deleteDish);

// Protected: Admin or Kitchen can edit dishes / toggle out-of-stock
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'kitchen'), MenuController.updateDish);

export default router;
