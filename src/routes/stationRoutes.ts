import express from 'express';
const router = express.Router();

// Controller imports
import { getStations, getStationById, addOrUpdateStation } from '../controllers/stationController';

// Routes
router.get('/', getStations);
router.get('/:id', getStationById);
router.post('/', addOrUpdateStation);

export default router;

