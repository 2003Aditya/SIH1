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
exports.getStreetViewsByStation = exports.uploadStreetViewRoute = exports.uploadStreetView = void 0;
const navigationModel_1 = __importDefault(require("../models/navigationModel")); // Import the StreetView model
const mongodb_1 = require("mongodb");
const stream_1 = require("stream");
const multer_1 = __importDefault(require("multer"));
const mongoURI = 'mongodb://localhost:27017/pannellum';
let bucket;
// Initialize MongoDB connection
const initializeMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield mongodb_1.MongoClient.connect(mongoURI);
        const db = client.db();
        bucket = new mongodb_1.GridFSBucket(db, { bucketName: 'images' });
        console.log('MongoDB connected and GridFSBucket initialized.');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
});
initializeMongoDB();
// Set up multer for file upload handling
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadStreetView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stationId, description } = req.body;
    try {
        if (!req.file || !bucket) {
            return res.status(400).send('No file uploaded or GridFSBucket not initialized.');
        }
        // Store the uploaded image in MongoDB using GridFS
        const readablePhotoStream = new stream_1.Readable();
        readablePhotoStream.push(req.file.buffer);
        readablePhotoStream.push(null);
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
        });
        readablePhotoStream.pipe(uploadStream);
        uploadStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const fileId = uploadStream.id;
            // Create a new StreetView document and save it to MongoDB
            const newStreetView = new navigationModel_1.default({
                stationId: new mongodb_1.ObjectId(stationId), // Ensure stationId is a valid ObjectId
                imageUrl: `/images/${fileId}`, // Store the URL for retrieving the image
                description,
                uploadedAt: new Date(),
            });
            yield newStreetView.save();
            res.status(201).send('Street view image uploaded successfully.');
        }));
        uploadStream.on('error', (err) => {
            console.error('Error uploading image:', err);
            res.status(500).send('Error uploading street view image.');
        });
    }
    catch (error) {
        console.error('Error processing street view image:', error);
        res.status(500).send('Error processing street view image.');
    }
});
exports.uploadStreetView = uploadStreetView;
exports.uploadStreetViewRoute = upload.single('file');
// Get 360-degree images for a station
const getStreetViewsByStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const streetViews = yield navigationModel_1.default.find({ stationId: req.params.stationId });
        res.json(streetViews);
    }
    catch (error) {
        console.error('Error retrieving street view images:', error);
        res.status(500).send('Error retrieving street view images.');
    }
});
exports.getStreetViewsByStation = getStreetViewsByStation;
