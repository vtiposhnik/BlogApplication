import { Sidebar } from "flowbite-react/components/Sidebar";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux'

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const {currentUser} = useSelector(state => state.user)

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
                            Управление
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as={'div'} active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='darkk'>
                            Профиль
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item as={'div'} active={tab === 'posts'} icon={HiInbox}>
                            Посты
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item as={'div'} active={tab === 'logout'} icon={HiArrowSmRight}>
                        Выйти
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}
