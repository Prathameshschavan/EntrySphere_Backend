"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_in_controller_1 = require("../controllers/check-in.controller");
const checkInRoute = express_1.default.Router();
checkInRoute.post("/", check_in_controller_1.addCheckIn);
checkInRoute.get("/", check_in_controller_1.getCheckIn);
exports.default = checkInRoute;
