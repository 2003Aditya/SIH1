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
const stationModel_1 = __importDefault(require("../models/stationModel"));
const getAllStations = () => __awaiter(void 0, void 0, void 0, function* () {
    return stationModel_1.default.find();
});
const getStationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return stationModel_1.default.findById(id);
});
const createOrUpdateStation = (stationData) => __awaiter(void 0, void 0, void 0, function* () {
    return stationModel_1.default.findByIdAndUpdate(stationData._id, stationData, { upsert:  });
});
