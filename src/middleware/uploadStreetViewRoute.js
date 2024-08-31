"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStreetViewRoute = void 0;
const multer_1 = __importDefault(require("multer"));
// Set up multer to use memory storage (stores files in memory as Buffer objects)
const storage = multer_1.default.memoryStorage();
exports.uploadStreetViewRoute = (0, multer_1.default)({ storage }).single('file');
