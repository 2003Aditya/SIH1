import mongoose, { Schema, Document } from 'mongoose';

interface IStreetView extends Document {
  stationId: mongoose.Types.ObjectId;
  imageUrl: string;
  description?: string;
  uploadedAt: Date;
}

const streetViewSchema = new Schema<IStreetView>({
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const StreetView = mongoose.model<IStreetView>('StreetView', streetViewSchema);

export default StreetView;
