import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid"

const Nav = () => {
    return (
        <>
        <nav className="w-1/2 text-lg">
        <div className="flex justify-between">
            <NavLink to="/" className="hover:text-orange-500 transition-colors">Home</NavLink>
            <NavLink to="/adoption" className="hover:text-orange-500 transition-colors">Adoption</NavLink>
            <NavLink to="/donate" className="hover:text-orange-500 transition-colors">Donate</NavLink>
            <NavLink to="/medical" className="hover:text-orange-500 transition-colors">Medical</NavLink>
            <a href="#contact-us" className="hover:text-orange-500 transition-colors">Contact Us</a>
            <NavLink to="/profile"><UserCircleIcon className="w-8 text-black hover:text-orange-500 transition-colors" /></NavLink>
        </div>
        </nav>
        </>
    )
}

export default Nav