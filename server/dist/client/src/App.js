"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const About_1 = __importDefault(require("./pages/About"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Home_1 = __importDefault(require("./pages/Home"));
const SignIn_1 = __importDefault(require("./pages/SignIn"));
const SignUp_1 = __importDefault(require("./pages/SignUp"));
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
const PrivateComponent_1 = __importDefault(require("./components/PrivateComponent"));
const Posts_1 = __importDefault(require("./pages/Posts"));
const PostPage_1 = __importDefault(require("./pages/PostPage"));
function App() {
    return (React.createElement("section", null,
        React.createElement(Header_1.default, null),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: '', element: React.createElement(Home_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/about', element: React.createElement(About_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/posts', element: React.createElement(Posts_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/posts/:postSlug', element: React.createElement(PostPage_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { element: React.createElement(PrivateComponent_1.default, null) },
                React.createElement(react_router_dom_1.Route, { path: '/dashboard', element: React.createElement(Dashboard_1.default, null) })),
            React.createElement(react_router_dom_1.Route, { path: '/sign-in', element: React.createElement(SignIn_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/sign-up', element: React.createElement(SignUp_1.default, null) })),
        React.createElement(Footer_1.default, null)));
}
exports.default = App;
