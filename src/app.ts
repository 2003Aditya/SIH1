import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';

// Import routes
import stationRoutes from './routes/stationRoutes';
import facilityRoutes from './routes/facilityRoutes';
import navigationRoutes from './routes/navigationRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
connectDB();
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/stations', stationRoutes);
app.use('/auth', authRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Error Handling Middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

