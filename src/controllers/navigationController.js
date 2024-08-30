"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreetViewsByStation = exports.uploadStreetView = void 0;
const navigationModel_1 = __importDefault(require("../models/navigationModel"));
// Upload a new 360-degree image
const uploadStreetView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { stationId, description } = req.body;
    const imageUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Assuming you're using a middleware like `multer` for file uploads
    try {
        const newStreetView = new navigationModel_1.default({
            stationId,
            imageUrl,
            description,
        });
        yield newStreetView.save();
        res.status(201).send('Street view image uploaded successfully.');
    }
    catch (error) {
        res.status(500).send('Error uploading street view image.');
    }
});
exports.uploadStreetView = uploadStreetView;
// Get 360-degree images for a station
const getStreetViewsByStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const streetViews = yield navigationModel_1.default.find({ stationId: req.params.stationId });
        res.json(streetViews);
    }
    catch (error) {
        res.status(500).send('Error retrieving street view images.');
    }
});
exports.getStreetViewsByStation = getStreetViewsByStation;
