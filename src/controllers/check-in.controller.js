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
exports.getCheckIn = exports.addCheckIn = void 0;
const check_in_model_1 = __importDefault(require("../models/check-in.model"));
const common_services_1 = require("../services/common.services");
const addCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const checkInData = Object.assign(Object.assign({}, req.body), { check_in_time: new Date(), check_out_time: "", dayIn: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`, dayOut: "" });
        console.log(checkInData);
        const newRecord = yield check_in_model_1.default.create(checkInData);
        (0, common_services_1.response)(res, 200, { message: "Check In Successfull", data: newRecord });
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
exports.addCheckIn = addCheckIn;
const getCheckIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, startDate, endDate } = req === null || req === void 0 ? void 0 : req.query;
        let checkInData = null;
        if (_id) {
            checkInData = yield check_in_model_1.default.findOne({ check_out_time: "", _id });
            if (!checkInData) {
                (0, common_services_1.response)(res, 400, { message: "_id not found" });
                return;
            }
        }
        else if (startDate && endDate) {
            // checkInData = await CheckIn.find({ createdAt: { $gt: new Date("2024-01-25"), $lt: new Date("2024-02-07") }, check_out_time: "" });
            checkInData = yield check_in_model_1.default.find({
                createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) },
                check_out_time: "",
            });
        }
        else if (startDate == "true") {
            const today = new Date();
            checkInData = yield check_in_model_1.default.find({
                createdAt: {
                    $gt: new Date(today.setDate(today.getDate() - 1)),
                    $lt: new Date(today.setDate(today.getDate() + 1)),
                },
                check_out_time: "",
            });
        }
        else {
            checkInData = yield check_in_model_1.default.find({ check_out_time: "" });
        }
        console.log(checkInData);
        (0, common_services_1.response)(res, 200, {
            message: "Check In Fetched Successfully",
            data: checkInData,
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
exports.getCheckIn = getCheckIn;
