import express from 'express';
const router = express.Router();

// Controller imports
import { getNavigation } from '../controllers/navigationController';

// Routes
router.get('/:id/navigate', getNavigation);

export default router;

