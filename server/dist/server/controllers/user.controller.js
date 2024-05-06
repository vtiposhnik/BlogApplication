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
exports.signout = exports.getUser = exports.getApi = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getApi = (req, res) => {
    res.send('ladidabudubadabi');
};
exports.getApi = getApi;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield user_model_1.default.findById('66377e4a55f7b37c918cbd4a');
    console.log(user);
    res.status(201).json({ message: 'user retrieved', success: true, user: user });
});
exports.getUser = getUser;
const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User signed out successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.signout = signout;
