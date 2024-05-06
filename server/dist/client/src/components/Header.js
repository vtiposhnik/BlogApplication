"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
function Header() {
    const { currentUser } = (0, react_redux_1.useSelector)((state) => state.user);
    const path = (0, react_router_dom_1.useLocation)().pathname;
    return (React.createElement(flowbite_react_1.Navbar, { className: 'border-b-2' },
        React.createElement(react_router_dom_1.Link, { to: '/', className: 'self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' },
            React.createElement("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' }, "Chebu"),
            "Pizza"),
        React.createElement("div", { className: 'flex gap-2 md:order-2' },
            currentUser ? (React.createElement("div", { className: "flex md:order-2" },
                React.createElement(flowbite_react_1.Dropdown, { arrowIcon: false, inline: true, label: React.createElement(flowbite_react_1.Avatar, { alt: "User settings", img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg", rounded: true }) },
                    React.createElement(flowbite_react_1.Dropdown.Header, null,
                        React.createElement("span", { className: "block text-sm" }, "Chebu Pizza"),
                        React.createElement("span", { className: "block truncate text-sm font-medium" })),
                    React.createElement(flowbite_react_1.Dropdown.Item, null,
                        React.createElement(react_router_dom_1.Link, { to: '/dashboard' }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435")),
                    React.createElement(flowbite_react_1.Dropdown.Item, null,
                        React.createElement(react_router_dom_1.Link, { to: '/dashboard?tab=profile' }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C")),
                    React.createElement(flowbite_react_1.Dropdown.Divider, null),
                    React.createElement(flowbite_react_1.Dropdown.Item, null, "\u0412\u044B\u0439\u0442\u0438")))) : (React.createElement(react_router_dom_1.Link, { to: '/sign-in' },
                React.createElement(flowbite_react_1.Button, { gradientDuoTone: 'purpleToBlue', outline: true }, "Sign In"))),
            React.createElement(flowbite_react_1.Navbar.Toggle, null)),
        React.createElement(flowbite_react_1.Navbar.Collapse, null,
            React.createElement(flowbite_react_1.Navbar.Link, { active: path === '/', as: 'div' },
                React.createElement(react_router_dom_1.Link, { to: '/' }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F")),
            React.createElement(flowbite_react_1.Navbar.Link, { active: path === '/about', as: 'div' },
                React.createElement(react_router_dom_1.Link, { to: '/about' }, "\u041E \u043D\u0430\u0441")),
            React.createElement(flowbite_react_1.Navbar.Link, { active: path === '/posts', as: 'div' },
                React.createElement(react_router_dom_1.Link, { to: '/posts' }, "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E")))));
}
exports.default = Header;
