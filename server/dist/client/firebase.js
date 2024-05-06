"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
// Import Firebase SDK
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
require("firebase/auth");
// import serviceAccount from './blog-chebu-firebase-adminsdk-gih1v-bd4d97696f.json'
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVNRs5Y6ZCQz16EqA4S4jGZ5qAIiSoT3E",
    authDomain: "blog-chebu.firebaseapp.com",
    projectId: "blog-chebu",
    storageBucket: "blog-chebu.appspot.com",
    messagingSenderId: "889702850641",
    appId: "1:889702850641:web:adf5ff7a82177a513b9870"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
exports.default = app;
