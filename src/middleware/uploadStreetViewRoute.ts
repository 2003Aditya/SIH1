import multer from 'multer';

// Set up multer to use memory storage (stores files in memory as Buffer objects)
const storage = multer.memoryStorage();
export const uploadStreetViewRoute = multer({ storage }).single('file');

