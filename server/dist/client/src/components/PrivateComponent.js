"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
function PrivateComponent() {
    const { currentUser } = (0, react_redux_1.useSelector)(state => state.user);
    return currentUser ? React.createElement(react_router_dom_1.Outlet, null) : React.createElement(react_router_dom_1.Navigate, { to: '/sign-in' });
}
exports.default = PrivateComponent;
