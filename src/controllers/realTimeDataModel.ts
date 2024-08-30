import { Request, Response } from 'express';
import realTimeDataService from '../services/realTimeDataService';

export const getRealTimeData = async (req: Request, res: Response) => {
  try {
    const data = await realTimeDataService.getData(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

