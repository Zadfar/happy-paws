import React from "react";
import Logo from "./Logo";
import Nav from "./Nav"


const Header = () => {
    return (
        <header className="bg-white sticky top-0 z-[20] mx-auto flex w-full items-center justify-between drop-shadow-md p-8 text-black px-24">
            <Logo />
            <Nav />
        </header>
    )
}

export default Header