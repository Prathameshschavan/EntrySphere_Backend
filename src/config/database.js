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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set("strictQuery", true);
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is not defined");
    }
    try {
        yield mongoose_1.default.connect("mongodb+srv://codenestcreation:Shashikant%40029@cluster0.rffa8d1.mongodb.net/security_management");
        console.log("Database connection established");
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = connection;
