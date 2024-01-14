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
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const common_services_1 = require("../services/common.services");
const jwt_services_1 = require("../services/jwt.services");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("object");
    try {
        const isExist = yield user_model_1.default.find({ email: req.body.email });
        if (isExist.length > 0 && req.body.method === "email") {
            return (0, common_services_1.response)(res, 400, {
                message: `User with '${req.body.email}' email already exists`,
            });
        }
        if (isExist.length > 0 && req.body.method === "google") {
            const token = (0, jwt_services_1.generateToken)(req.body);
            delete req.body.password;
            delete req.body.jti;
            delete req.body.sub;
            delete req.body.method;
            return (0, common_services_1.response)(res, 200, {
                message: `User registered successfully`,
                user: req.body,
                token: token,
            });
        }
        if (req.body.method === "email") {
            const hashedPassword = (0, common_services_1.hashPassword)(req.body.password);
            yield user_model_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
            delete req.body.password;
            delete req.body.method;
            return (0, common_services_1.response)(res, 200, {
                message: "User registered successfully",
                user: Object.assign({}, req.body),
            });
        }
        if (req.body.method === "google") {
            const token = (0, jwt_services_1.generateToken)(req.body);
            yield user_model_1.default.create(Object.assign({}, req.body));
            delete req.body.jti;
            delete req.body.sub;
            delete req.body.method;
            return (0, common_services_1.response)(res, 200, {
                message: "User registered successfully",
                user: req.body,
                token: token,
            });
        }
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
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const isExist = yield user_model_1.default.find({ email: req.body.email });
        const isExistObj = Object.assign({}, (_a = isExist[0]) === null || _a === void 0 ? void 0 : _a._doc);
        if (isExist.length === 0 && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.method) === "email") {
            return (0, common_services_1.response)(res, 400, {
                message: `User with email '${req.body.email}' is not registered`,
            });
        }
        if (isExist.length === 0 && ((_c = req.body) === null || _c === void 0 ? void 0 : _c.method) === "google") {
            const token = (0, jwt_services_1.generateToken)(req.body);
            yield user_model_1.default.create(Object.assign({}, req.body));
            delete req.body.jti;
            delete req.body.sub;
            return (0, common_services_1.response)(res, 200, {
                message: "User registered successfully",
                user: req.body,
                token: token,
            });
        }
        let userObject = {
            first_name: isExistObj.first_name || "",
            last_name: isExistObj.last_name || "",
            email: isExistObj.email || "",
            password: isExistObj.password || "",
            avatar: isExistObj.avatar || "",
            sub: isExistObj.sub || "",
            jti: isExistObj.jti || "",
        };
        if (isExist.length > 0 && req.body.method === "google") {
            const token = (0, jwt_services_1.generateToken)(userObject);
            delete userObject.password;
            delete userObject.jti;
            delete userObject.sub;
            return (0, common_services_1.response)(res, 200, {
                message: `User registered successfully`,
                user: userObject,
                token: token,
            });
        }
        const hashedPassword = (0, common_services_1.hashPassword)(req.body.password);
        if (hashedPassword !== ((_d = isExist[0]) === null || _d === void 0 ? void 0 : _d.password)) {
            return (0, common_services_1.response)(res, 400, {
                message: `The password you entered is incorrect. Please double-check your password and try again.`,
            });
        }
        const token = (0, jwt_services_1.generateToken)(userObject);
        delete userObject.password;
        delete userObject.jti;
        delete userObject.sub;
        return (0, common_services_1.response)(res, 200, {
            message: "login successful",
            user: userObject,
            token: token,
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
exports.login = login;
