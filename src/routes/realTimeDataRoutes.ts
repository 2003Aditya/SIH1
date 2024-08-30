import express from 'express';
import { getRealTimeData } from '../controllers/realTimeDataController';

const router = express.Router();

router.get('/:id', getRealTimeData);

export default router;

