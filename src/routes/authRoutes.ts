import express from 'express';
const router = express.Router();

// Controller imports
import { register, login } from '../controllers/authController';

// Routes
router.post('/register', register);
router.post('/login', login);

export default router;

