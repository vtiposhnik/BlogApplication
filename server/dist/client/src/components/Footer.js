"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_router_dom_1 = require("react-router-dom");
const bs_1 = require("react-icons/bs");
function FooterCom() {
    return (React.createElement(flowbite_react_1.Footer, { container: true, className: 'border border-t-8 border-teal-500' },
        React.createElement("div", { className: 'w-full max-w-7xl mx-auto' },
            React.createElement("div", { className: 'grid w-full justify-between sm:flex md:grid-cols-1' },
                React.createElement("div", { className: 'mt-5' },
                    React.createElement(react_router_dom_1.Link, { to: '/', className: 'self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white' },
                        React.createElement("span", { className: 'px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' }, "Chebu"),
                        "Pizza")),
                React.createElement("div", { className: 'grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6' },
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Footer.Title, { title: '\u041E \u043D\u0430\u0441' }),
                        React.createElement(flowbite_react_1.Footer.LinkGroup, { col: true },
                            React.createElement(flowbite_react_1.Footer.Link, { href: '/about', target: '_blank', rel: 'noopener noreferrer' }, "ChebuPizza"))),
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Footer.Title, { title: '\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0441\u044C' }),
                        React.createElement(flowbite_react_1.Footer.LinkGroup, { col: true },
                            React.createElement(flowbite_react_1.Footer.Link, { href: 'https://www.github.com', target: '_blank' }, "Github"),
                            React.createElement(flowbite_react_1.Footer.Link, { href: '#' }, "Discord"))),
                    React.createElement("div", null,
                        React.createElement(flowbite_react_1.Footer.Title, { title: '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B' }),
                        React.createElement(flowbite_react_1.Footer.LinkGroup, { col: true },
                            React.createElement(flowbite_react_1.Footer.Link, { href: '#' }, "Privacy Policy"),
                            React.createElement(flowbite_react_1.Footer.Link, { href: '#' }, "Terms & Conditions"))))),
            React.createElement(flowbite_react_1.Footer.Divider, null),
            React.createElement("div", { className: 'w-full sm:flex sm:items-center sm:justify-between' },
                React.createElement(flowbite_react_1.Footer.Copyright, { href: '#', by: "ChebuPizza", year: new Date().getFullYear() }),
                React.createElement("div", { className: "flex gap-6 sm:mt-0 mt-4 sm:justify-center" },
                    React.createElement(flowbite_react_1.Footer.Icon, { href: '#', icon: bs_1.BsFacebook }),
                    React.createElement(flowbite_react_1.Footer.Icon, { href: '#', icon: bs_1.BsInstagram }),
                    React.createElement(flowbite_react_1.Footer.Icon, { href: '#', icon: bs_1.BsTwitter }),
                    React.createElement(flowbite_react_1.Footer.Icon, { href: '#', icon: bs_1.BsDribbble }))))));
}
exports.default = FooterCom;
