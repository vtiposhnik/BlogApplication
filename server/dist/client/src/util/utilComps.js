"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomButton = exports.Button2 = void 0;
const react_router_dom_1 = require("react-router-dom");
const Button2 = (props) => {
    const { value, handleClick, styles, type } = props;
    return (React.createElement("button", { style: styles, type: type, onClick: handleClick, className: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" }, value));
};
exports.Button2 = Button2;
const CustomButton = (props) => {
    const { value, path } = props;
    return (React.createElement(react_router_dom_1.Link, { to: path, className: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" }, value));
};
exports.CustomButton = CustomButton;
