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
exports.addOrUpdateFacility = exports.getFacilityById = exports.getFacilities = void 0;
const stationModel_1 = __importDefault(require("../models/stationModel"));
// Get all stations
const getFacilities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stations = yield stationModel_1.default.find();
        res.json(stations);
    }
    catch (error) {
        res.status(500).send('Error retrieving stations.');
    }
});
exports.getFacilities = getFacilities;
// Get a station by ID
const getFacilityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const station = yield stationModel_1.default.findById(req.params.id);
        if (!station)
            return res.status(404).send('Station not found.');
        res.json(station);
    }
    catch (error) {
        res.status(500).send('Error retrieving station.');
    }
});
exports.getFacilityById = getFacilityById;
// Add or update a station
const addOrUpdateFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, location, layout } = req.body;
    try {
        let station;
        if (id) {
            // Update existing station
            station = yield stationModel_1.default.findById(id);
            if (!station)
                return res.status(404).send('Station not found.');
            station.name = name;
            station.location = location;
            station.layout = layout;
            yield station.save();
            res.send('Station updated.');
        }
        else {
            // Add new station
            station = new stationModel_1.default({ name, location, layout });
            yield station.save();
            res.send('Station added.');
        }
    }
    catch (error) {
        res.status(500).send('Error adding/updating station.');
    }
});
exports.addOrUpdateFacility = addOrUpdateFacility;
