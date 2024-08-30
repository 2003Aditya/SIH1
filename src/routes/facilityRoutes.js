"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controller imports
const facilityController_1 = require("../controllers/facilityController");
// Routes
router.get('/:id/facilities', facilityController_1.getFacilities);
router.get('/:id/facilities/:facilityId', facilityController_1.getFacilityById);
router.post('/:id/facilities', facilityController_1.addOrUpdateFacility);
exports.default = router;
