import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/demo-accounts', AuthController.getDemoAccounts);

// Protected routes (Requires Bearer JWT)
router.get('/me', authenticateJWT, AuthController.getProfile);

export default router;
