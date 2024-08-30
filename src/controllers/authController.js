"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel")); // Ensure this path is correct
// Example login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = yield userModel_1.default.findOne({ username });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            // Set user info in the request object
            req.user = { id: user._id.toString(), role: user.role };
            res.status(200).send('Logged in successfully');
        }
        else {
            res.status(401).send('Invalid credentials');
        }
    }
    catch (error) {
        res.status(500).send('Server error');
    }
});
exports.login = login;
// Register function
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const user = new userModel_1.default({ username, password: hashedPassword, role });
        yield user.save();
        res.status(201).send('User registered successfully');
    }
    catch (error) {
        res.status(500).send('Server error');
    }
});
exports.register = register;
