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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFetch = exports.API_URL = void 0;
exports.API_URL = 'http://localhost:3307/api';
function authFetch(_a) {
    return __awaiter(this, arguments, void 0, function* ({ formData, method, auth }) {
        try {
            const response = yield fetch(`/api/auth/${auth}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    });
}
exports.authFetch = authFetch;
