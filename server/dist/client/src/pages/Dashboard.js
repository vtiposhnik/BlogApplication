"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const DashSidebar_1 = __importDefault(require("../components/DashSidebar"));
const DashProfile_1 = __importDefault(require("../components/DashProfile"));
const DashPostManage_1 = __importDefault(require("../components/DashPostManage"));
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';
function Dashboard() {
    const location = (0, react_router_dom_1.useLocation)();
    const [tab, setTab] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (React.createElement("div", { className: 'min-h-screen flex flex-col md:flex-row' },
        React.createElement("div", { className: 'md:w-56' },
            React.createElement(DashSidebar_1.default, null)),
        tab === 'profile' && React.createElement(DashProfile_1.default, null),
        tab === 'posts' && React.createElement(DashPostManage_1.default, null)));
}
exports.default = Dashboard;
