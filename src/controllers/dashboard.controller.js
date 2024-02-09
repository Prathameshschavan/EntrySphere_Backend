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
exports.getDashboardData = void 0;
const check_in_model_1 = __importDefault(require("../models/check-in.model"));
const common_services_1 = require("../services/common.services");
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const start = new Date(today.setDate(today.getDate() - 1));
        const end = new Date(today.setDate(today.getDate() + 1));
        const checkInData = yield check_in_model_1.default.find({
            createdAt: {
                $gt: start,
                $lt: end,
            },
        });
        const checkOutData = yield check_in_model_1.default.find({
            createdAt: {
                $gt: start,
                $lt: end,
            },
        });
        (0, common_services_1.response)(res, 200, {
            message: "done successfully",
            data: { checkIns: checkInData.length, checkOuts: checkOutData.length },
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            (0, common_services_1.response)(res, 500, { message: error.message });
        }
        else {
            (0, common_services_1.response)(res, 500, { message: "An unexpected error occurred." });
        }
    }
});
exports.getDashboardData = getDashboardData;
