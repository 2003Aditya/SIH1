"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controller imports
const navigationController_1 = require("../controllers/navigationController");
// Routes
// Apply the multer middleware `uploadStreetViewRoute` before your controller `uploadStreetView`
router.post('/upload', navigationController_1.uploadStreetViewRoute, navigationController_1.uploadStreetView);
exports.default = router;
