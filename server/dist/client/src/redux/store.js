"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const userSlice_1 = __importDefault(require("./user/userSlice"));
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const persistStore_1 = __importDefault(require("redux-persist/es/persistStore"));
const rootReducer = (0, toolkit_1.combineReducers)({
    user: userSlice_1.default
});
const persistConfig = {
    key: 'root',
    storage: storage_1.default,
    version: 1
};
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});
exports.persistor = (0, persistStore_1.default)(exports.store);
