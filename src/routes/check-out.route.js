"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_out_controller_1 = require("../controllers/check-out.controller");
const checkOutRoute = express_1.default.Router();
checkOutRoute.get("/", check_out_controller_1.getCheckOut);
checkOutRoute.put("/", check_out_controller_1.addCheckOut);
exports.default = checkOutRoute;
