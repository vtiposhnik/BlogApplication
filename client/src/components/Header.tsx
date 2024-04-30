
import { Button, Navbar, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Navbar fluid rounded className="">
            <Link to='/'>
                <span className="self-center bg-gradient-to-r from-blue-500 via-emerald-200 to-zinc-100">Chebu</span>
                Pizza
            </Link>
            <div className="flex md:order-2">
                <NavbarToggle />
            </div>
            <Navbar.Collapse className="lg:flex lg:items-center">
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
                    <Link to='/auth'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
