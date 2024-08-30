"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.loggingMiddleware = loggingMiddleware;
