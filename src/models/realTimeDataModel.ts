import mongoose from 'mongoose';

const realTimeDataSchema = new mongoose.Schema({
  stationId: mongoose.Schema.Types.ObjectId,
  crowdLevel: String,
  status: String,
});

const RealTimeData = mongoose.model('RealTimeData', realTimeDataSchema);
export default RealTimeData;

