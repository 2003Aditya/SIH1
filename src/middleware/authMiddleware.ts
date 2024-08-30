import { Request, Response, NextFunction } from 'express';

// Middleware to check if user is admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Assuming `req.user` contains user info after authentication
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Forbidden: Admins only.');
};

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Assuming `req.user` contains user info after authentication
  if (req.user) {
    return next();
  }
  res.status(401).send('Unauthorized: Please log in.');
};
