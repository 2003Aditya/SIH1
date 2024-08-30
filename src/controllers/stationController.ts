
import { Request, Response } from 'express';
import Station from '../models/stationModel';

// Get all stations
export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).send('Error retrieving stations.');
  }
};

// Get a station by ID
export const getStationById = async (req: Request, res: Response) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).send('Station not found.');
    res.json(station);
  } catch (error) {
    res.status(500).send('Error retrieving station.');
  }
};

// Add or update a station
export const addOrUpdateStation = async (req: Request, res: Response) => {
  const { id, name, location, layout } = req.body;
  try {
    let station;
    if (id) {
      // Update existing station
      station = await Station.findById(id);
      if (!station) return res.status(404).send('Station not found.');
      station.name = name;
      station.location = location;
      station.layout = layout;
      await station.save();
      res.send('Station updated.');
    } else {
      // Add new station
      station = new Station({ name, location, layout });
      await station.save();
      res.send('Station added.');
    }
  } catch (error) {
    res.status(500).send('Error adding/updating station.');
  }
};
