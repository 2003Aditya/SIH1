"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const realTimeDataController_1 = require("../controllers/realTimeDataController");
const router = express_1.default.Router();
router.get('/:id', realTimeDataController_1.getRealTimeData);
exports.default = router;
