"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (payload) => {
    let token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "codenext029");
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "codenext029");
        return decodedToken;
    }
    catch (error) {
        throw new Error("Invalid Token");
    }
};
exports.verifyToken = verifyToken;
