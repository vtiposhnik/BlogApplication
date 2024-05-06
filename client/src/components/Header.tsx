
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

export default function Header() {
    const { currentUser } = useSelector((state: RootState) => state.user)
    const path = useLocation().pathname;

    return (
        <Navbar className='border-b-2'>
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Chebu
                </span>
                Pizza
            </Link>

            <div className='flex gap-2 md:order-2'>
                {currentUser ? (
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">Chebu Pizza</span>
                                <span className="block truncate text-sm font-medium"></span>
                            </Dropdown.Header>
                            <Dropdown.Item><Link to='/dashboard'>Управление</Link></Dropdown.Item>
                            <Dropdown.Item><Link to='/dashboard?tab=profile'>Профиль</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Выйти</Dropdown.Item>
                        </Dropdown>
                    </div>
                ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Главная</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>О нас</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/posts'} as={'div'}>
                    <Link to='/posts'>Сообщество</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
