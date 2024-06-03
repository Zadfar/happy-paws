import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid"

const Nav = () => {
    return (
        <>
        <nav className="w-1/3 text-lg">
        <div className="flex justify-between">
            <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
            <NavLink to="/adoption" className="hover:text-orange-500">Adoption</NavLink>
            <NavLink to="/donate" className="hover:text-orange-500">Donate</NavLink>
            <a href="#contact-us" className="hover:text-orange-500">Contact Us</a>
            <NavLink to="/profile"><UserCircleIcon className="w-8 text-white hover:text-orange-500" /></NavLink>
        </div>
        </nav>
        </>
    )
}

export default Nav