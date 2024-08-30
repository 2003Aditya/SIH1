"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controller imports
const stationController_1 = require("../controllers/stationController");
// Routes
router.get('/', stationController_1.getStations);
router.get('/:id', stationController_1.getStationById);
router.post('/', stationController_1.addOrUpdateStation);
exports.default = router;
