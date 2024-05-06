"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutSuccess = exports.signInFailure = exports.signInSuccess = exports.signInStart = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    currentUser: null,
    error: null,
    loading: false
};
const userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logOutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
});
_a = userSlice.actions, exports.signInStart = _a.signInStart, exports.signInSuccess = _a.signInSuccess, exports.signInFailure = _a.signInFailure, exports.logOutSuccess = _a.logOutSuccess;
exports.default = userSlice.reducer;
