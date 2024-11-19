import React, { useState } from "react";
import Logo from "../../../images/nobg.png";
import { NavLink, Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ResponsiveMenu from "./ResponsiveMenu";

export const NavbarLinks = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Tentang",
    link: "/about",
  },
  {
    name: "Destinasi",
    link: "/blogs",
  },
  {
    name: "Berita",
    link: "/best-places",
  },
  {
    name: "Kuliner",
    link: "/culinary",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4 font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-16" />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                {NavbarLinks.map(({ name, link }) => (
                  <li key={name} className="py-4">
                    <NavLink to={link} activeClassName="active">
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* Actions and Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={() => {
                  handleOrderPopup();
                }}
              >
                Masuk
              </button>
              {/* Mobile Hamburger Icon */}
              <div className="md:hidden block">
                {showMenu ? (
                  <CloseOutlined
                    onClick={toggleMenu}
                    className="cursor-pointer text-lg"
                  />
                ) : (
                  <MenuOutlined
                    onClick={toggleMenu}
                    className="cursor-pointer text-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Responsive Menu */}
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
