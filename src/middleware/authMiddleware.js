"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAdmin = void 0;
// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    // Assuming `req.user` contains user info after authentication
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Forbidden: Admins only.');
};
exports.isAdmin = isAdmin;
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    // Assuming `req.user` contains user info after authentication
    if (req.user) {
        return next();
    }
    res.status(401).send('Unauthorized: Please log in.');
};
exports.isAuthenticated = isAuthenticated;
