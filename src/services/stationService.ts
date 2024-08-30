import Station from '../models/stationModel';

const getAllStations = async () => {
  return Station.find();
};

const getStationById = async (id: string) => {
  return Station.findById(id);
};

const createOrUpdateStation = async (stationData: any) => {
  return Station.findByIdAndUpdate(stationData._id, stationData, { upsert:

