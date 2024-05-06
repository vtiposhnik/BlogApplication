"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.getApi);
router.get('/getUser', user_controller_1.getUser);
router.post('/signout', user_controller_1.signout);
exports.default = router;
