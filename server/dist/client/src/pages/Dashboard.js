import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPostManage from '../components/DashPostManage';
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';
export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (_jsxs("div", { className: 'min-h-screen flex flex-col md:flex-row', children: [_jsx("div", { className: 'md:w-56', children: _jsx(DashSidebar, {}) }), tab === 'profile' && _jsx(DashProfile, {}), tab === 'posts' && _jsx(DashPostManage, {})] }));
}
