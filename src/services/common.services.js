"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    let hashedPassword = bcrypt_1.default.hashSync(password, "$2b$10$1234567890123456789012");
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const response = (res, status, response) => {
    return res.status(status).send(response);
};
exports.response = response;
