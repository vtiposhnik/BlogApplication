import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar } from "flowbite-react/components/Sidebar";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (_jsx(Sidebar, { className: 'w-full md:w-56', children: _jsx(Sidebar.Items, { children: _jsxs(Sidebar.ItemGroup, { className: 'flex flex-col gap-1', children: [_jsx(Link, { to: '/dashboard', children: _jsx(Sidebar.Item, { as: 'div', active: tab === '', icon: HiChartPie, children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }) }), _jsx(Link, { to: '/dashboard?tab=profile', children: _jsx(Sidebar.Item, { as: 'div', active: tab === 'profile', icon: HiUser, label: currentUser.isAdmin ? 'Admin' : 'User', labelColor: 'darkk', children: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C" }) }), _jsx(Link, { to: '/dashboard?tab=posts', children: _jsx(Sidebar.Item, { as: 'div', active: tab === 'posts', icon: HiInbox, children: "\u041F\u043E\u0441\u0442\u044B" }) }), _jsx(Sidebar.Item, { as: 'div', active: tab === 'logout', icon: HiArrowSmRight, children: "\u0412\u044B\u0439\u0442\u0438" })] }) }) }));
}
