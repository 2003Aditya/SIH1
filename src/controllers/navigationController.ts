import { Request, Response } from 'express';
import StreetView from '../models/navigationModel'; // Import the StreetView model
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import multer from 'multer';

const mongoURI = 'mongodb://localhost:27017/pannellum';
let bucket: GridFSBucket | undefined;

const initializeMongoDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db();
    bucket = new GridFSBucket(db, { bucketName: 'images' });
    console.log('MongoDB connected and GridFSBucket initialized.');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    if (err instanceof Error) {
      console.error('Error details:', err.message);
    }
  }
};
// Initialize MongoDB connection
initializeMongoDB();

// Set up multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadStreetView = async (req: Request, res: Response) => {
  const { stationId, description } = req.body;

  console.log('Received file:', req.file);
  console.log('Station ID:', stationId);
  console.log('Description:', description);
  try {
    if (!req.file || !bucket) {
      return res.status(400).send('No file uploaded or GridFSBucket not initialized.');
    }

    // Store the uploaded image in MongoDB using GridFS
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(req.file.buffer);
    readablePhotoStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    readablePhotoStream.pipe(uploadStream);

    uploadStream.on('finish', async () => {
      const fileId = uploadStream.id;

      // Create a new StreetView document and save it to MongoDB
      const newStreetView = new StreetView({
        stationId: new ObjectId(stationId), // Ensure stationId is a valid ObjectId
        imageUrl: `/images/${fileId}`, // Store the URL for retrieving the image
        description,
        uploadedAt: new Date(),
      });

      await newStreetView.save();
      res.status(201).send('Street view image uploaded successfully.');
    });

    uploadStream.on('error', (err: Error) => {
      console.error('Error uploading image:', err);
      res.status(500).send('Error uploading street view image.');
    });
  } catch (error) {
    console.error('Error processing street view image:', error);
    res.status(500).send('Error processing street view image.');
  }
};

export const uploadStreetViewRoute = upload.single('file');

// Get 360-degree images for a station
export const getStreetViewsByStation = async (req: Request, res: Response) => {
  try {
    const streetViews = await StreetView.find({ stationId: req.params.stationId });
    res.json(streetViews);
  } catch (error) {
    console.error('Error retrieving street view images:', error);
    res.status(500).send('Error retrieving street view images.');
  }
};
