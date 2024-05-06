"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sidebar_1 = require("flowbite-react/components/Sidebar");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
function DashSidebar() {
    const location = (0, react_router_dom_1.useLocation)();
    const [tab, setTab] = (0, react_1.useState)('');
    const { currentUser } = (0, react_redux_1.useSelector)(state => state.user);
    (0, react_1.useEffect)(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (React.createElement(Sidebar_1.Sidebar, { className: 'w-full md:w-56' },
        React.createElement(Sidebar_1.Sidebar.Items, null,
            React.createElement(Sidebar_1.Sidebar.ItemGroup, { className: 'flex flex-col gap-1' },
                React.createElement(react_router_dom_1.Link, { to: '/dashboard' },
                    React.createElement(Sidebar_1.Sidebar.Item, { as: 'div', active: tab === '', icon: hi_1.HiChartPie }, "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435")),
                React.createElement(react_router_dom_1.Link, { to: '/dashboard?tab=profile' },
                    React.createElement(Sidebar_1.Sidebar.Item, { as: 'div', active: tab === 'profile', icon: hi_1.HiUser, label: currentUser.isAdmin ? 'Admin' : 'User', labelColor: 'darkk' }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C")),
                React.createElement(react_router_dom_1.Link, { to: '/dashboard?tab=posts' },
                    React.createElement(Sidebar_1.Sidebar.Item, { as: 'div', active: tab === 'posts', icon: hi_1.HiInbox }, "\u041F\u043E\u0441\u0442\u044B")),
                React.createElement(Sidebar_1.Sidebar.Item, { as: 'div', active: tab === 'logout', icon: hi_1.HiArrowSmRight }, "\u0412\u044B\u0439\u0442\u0438")))));
}
exports.default = DashSidebar;
