import express from 'express';
const router = express.Router();

// Controller imports
import { getFacilities, getFacilityById, addOrUpdateFacility } from '../controllers/facilityController';

// Routes
router.get('/:id/facilities', getFacilities);
router.get('/:id/facilities/:facilityId', getFacilityById);
router.post('/:id/facilities', addOrUpdateFacility);

export default router;


