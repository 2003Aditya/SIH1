"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const realTimeDataSchema = new mongoose_1.default.Schema({
    stationId: mongoose_1.default.Schema.Types.ObjectId,
    crowdLevel: String,
    status: String,
});
const RealTimeData = mongoose_1.default.model('RealTimeData', realTimeDataSchema);
exports.default = RealTimeData;
