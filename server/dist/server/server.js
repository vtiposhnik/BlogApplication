"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const path_1 = __importDefault(require("path"));
// middleware
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
dotenv_1.default.config();
// console.log(process.env.PASSWORD_DB);
if (process.env.MONGO_URL) {
    mongoose_1.default.connect(process.env.MONGO_URL)
        .then(() => {
        console.log("MongoDB connected successfully!");
    })
        .catch((error) => {
        console.log(error);
    });
}
else {
    console.log('environment variable is undefined!');
}
// vars
// routes
app.use('/api/user', user_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        text: 'Additional error information here',
    });
});
const port = 3307;
app.listen(port, () => {
    console.log(`running on http://localhost:${port}`);
});
