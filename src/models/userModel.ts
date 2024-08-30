import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: string; // Adjust as needed, e.g., 'admin' or 'client'
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'client'], // Adjust according to your roles
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
