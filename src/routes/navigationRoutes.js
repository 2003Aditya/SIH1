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
router.get('/:id/navigate', navigationController_1.getNavigation);
exports.default = router;
