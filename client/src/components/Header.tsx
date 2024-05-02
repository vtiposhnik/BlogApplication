
import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { CustomButton } from "../util/utilComps";

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
                    Sahand's
                </span>
                Blog
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
                                <span className="block text-sm">Vti poshnik</span>
                                <span className="block truncate text-sm font-medium"></span>
                            </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
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
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                {/* <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/about'>Catalog</Link>
                </Navbar.Link> */}
            </Navbar.Collapse>
        </Navbar>
    );
}
