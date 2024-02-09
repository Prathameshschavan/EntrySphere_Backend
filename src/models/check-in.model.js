"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const checkInSchema = new mongoose_1.default.Schema({
    check_in_time: {
        type: String,
        require: true,
    },
    check_out_time: {
        type: String,
        require: false,
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        require: false,
    },
    mobile_no: {
        type: String,
        require: false,
    },
    visit_to: {
        type: String,
        require: false,
    },
    purpose: {
        type: String,
        require: false,
    },
    coming_from: {
        type: String,
        require: false,
    },
    vehicle_info: {
        type: String,
        require: false,
    },
    company_name: {
        type: String,
        require: false,
    },
    dayIn: {
        type: String,
        require: false,
    },
    dayOut: {
        type: String,
        require: false,
    },
    entry_by: {
        type: String,
        require: false,
    },
    remark: {
        type: String,
        require: false,
    }
}, {
    timestamps: true,
});
const CheckIn = mongoose_1.default.model("CheckIn", checkInSchema);
exports.default = CheckIn;
