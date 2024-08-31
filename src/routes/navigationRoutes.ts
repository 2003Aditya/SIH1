import express from 'express';
const router = express.Router();

// Controller imports
import { uploadStreetView, uploadStreetViewRoute } from '../controllers/navigationController';

// Routes

// Apply the multer middleware `uploadStreetViewRoute` before your controller `uploadStreetView`
router.post('/upload', uploadStreetViewRoute, uploadStreetView);

export default router;
