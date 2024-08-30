import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: String,
  type: String,
  stationId: mongoose.Schema.Types.ObjectId,
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;

