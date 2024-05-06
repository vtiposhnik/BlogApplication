"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyToken = (req, res, next) => {
    const secret_key = process.env.SECRET_KEY_JWT;
    const token = req.cookies.access_token;
    if (!secret_key) {
        return next((0, error_1.errorHandler)(500, 'Internal Server Error'));
    }
    if (!token) {
        return next((0, error_1.errorHandler)(401, 'Unauthorized'));
    }
    jsonwebtoken_1.default.verify(token, secret_key, (err, user) => {
        if (err) {
            return next((0, error_1.errorHandler)(401, 'Unauthorized'));
        }
        req.body.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
