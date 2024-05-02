
import { Button, Navbar, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Navbar fluid rounded>
            <Link to='/'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>Chebu</span>
                Pizza
            </Link>
            <div className="flex md:order-2">
                <NavbarToggle />
            </div>
            <Navbar.Collapse >
                <div className="md:flex md:items-center gap-3">

                    <Navbar.Link href="#" as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link href="#" as={'div'}>
                        <Link to='/about'>
                            About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link href="#" as={'div'}>
                        <Link to='/dashboard'>
                            Dashboard
                        </Link>
                    </Navbar.Link>
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}
