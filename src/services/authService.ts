import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register = async (userData: any) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const login = async (loginData: any) => {
  const user = await User.findOne({ username: loginData.username });
  if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
  return token;
};

export default { register, login };

