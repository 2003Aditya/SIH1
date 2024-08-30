
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Station document
interface IStation extends Document {
  name: string;
  location: string;
  layout: any; // Use a more specific type if possible
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a schema for the Station model
const stationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  layout: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Station model
const Station = mongoose.model<IStation>('Station', stationSchema);

export default Station;
