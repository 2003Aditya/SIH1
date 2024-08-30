import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel'; // Ensure this path is correct

// Example login function
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      // Set user info in the request object
      req.user = { id: user._id.toString(), role: user.role };
      res.status(200).send('Logged in successfully');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Register function
export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
