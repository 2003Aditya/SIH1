import { Request, Response } from 'express';
import StreetView from '../models/navigationModel';

// Upload a new 360-degree image
export const uploadStreetView = async (req: Request, res: Response) => {
  const { stationId, description } = req.body;
  const imageUrl = req.file?.path; // Assuming you're using a middleware like `multer` for file uploads

  try {
    const newStreetView = new StreetView({
      stationId,
      imageUrl,
      description,
    });

    await newStreetView.save();
    res.status(201).send('Street view image uploaded successfully.');
  } catch (error) {
    res.status(500).send('Error uploading street view image.');
  }
};

// Get 360-degree images for a station
export const getStreetViewsByStation = async (req: Request, res: Response) => {
  try {
    const streetViews = await StreetView.find({ stationId: req.params.stationId });
    res.json(streetViews);
  } catch (error) {
    res.status(500).send('Error retrieving street view images.');
  }
};
