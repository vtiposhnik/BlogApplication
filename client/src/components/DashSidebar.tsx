import { Sidebar } from "flowbite-react/components/Sidebar";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard'>
                        <Sidebar.Item as={'div'} active={tab === ''} icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as={'div'} active={tab === 'profile'} icon={HiUser} label='user' labelColor='darkk'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item as={'div'} active={tab === 'posts'} icon={HiInbox}>
                            Posts
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item as={'div'} active={tab === 'logout'} icon={HiArrowSmRight}>
                        Log Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}
