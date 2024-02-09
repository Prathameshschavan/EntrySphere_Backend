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
exports.addCheckOut = exports.getCheckOut = void 0;
const check_in_model_1 = __importDefault(require("../models/check-in.model"));
const common_services_1 = require("../services/common.services");
const getCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, startDate, endDate } = req === null || req === void 0 ? void 0 : req.query;
        let checkOutData;
        if (_id) {
            checkOutData = yield check_in_model_1.default.findOne({
                _id,
                check_out_time: { $ne: "" || undefined || null },
            });
            if (!checkOutData) {
                (0, common_services_1.response)(res, 400, { message: "_id not found" });
                return;
            }
        }
        else if (startDate && endDate) {
            checkOutData = yield check_in_model_1.default.find({
                createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) },
                check_out_time: { $ne: "" || undefined || null },
            });
        }
        else if (startDate == "true") {
            const today = new Date();
            checkOutData = yield check_in_model_1.default.find({
                createdAt: {
                    $gt: new Date(today.setDate(today.getDate() - 1)),
                    $lt: new Date(today.setDate(today.getDate() + 1)),
                },
                check_out_time: { $ne: "" || undefined || null },
            });
        }
        else {
            checkOutData = yield check_in_model_1.default.find({
                check_out_time: { $ne: "" || undefined || null },
            });
        }
        (0, common_services_1.response)(res, 200, {
            message: "Checkout fetched successfully",
            data: checkOutData,
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
exports.getCheckOut = getCheckOut;
const addCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req === null || req === void 0 ? void 0 : req.query;
        if (!_id) {
            (0, common_services_1.response)(res, 400, { message: "_id not found" });
            return;
        }
        const checkOutData = yield check_in_model_1.default.findOne({ _id });
        if (!checkOutData) {
            (0, common_services_1.response)(res, 400, { message: "_id not found" });
            return;
        }
        if (checkOutData.check_out_time !== "") {
            (0, common_services_1.response)(res, 400, { message: "This visitor is already checked out" });
            return;
        }
        const today = new Date();
        const updatedData = yield check_in_model_1.default.findOneAndUpdate({ _id }, {
            $set: {
                check_out_time: new Date(),
                dayOut: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`,
            },
        }, { new: true });
        (0, common_services_1.response)(res, 200, updatedData);
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
exports.addCheckOut = addCheckOut;
