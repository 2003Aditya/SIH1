"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// Import routes
const stationRoutes_1 = __importDefault(require("./routes/stationRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const navigationController_1 = require("./controllers/navigationController");
const app = (0, express_1.default)();
(0, db_1.default)();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/stations', stationRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/navigationRoutes', navigationController_1.uploadStreetView);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Error Handling Middleware
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
