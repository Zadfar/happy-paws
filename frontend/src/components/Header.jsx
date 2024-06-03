import React from "react";
import Logo from "./Logo";
import Nav from "./Nav"


const Header = () => {
    return (
        <header className="bg-black sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-8 text-white px-24">
            <Logo />
            <Nav />
        </header>
    )
}

export default Header