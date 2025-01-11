import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined, LogoutOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "../../../images/nobg.png";
import ProfilePic from "../../../images/A.png";
import { AuthContext } from "../../providers/AuthProvider";
import { jwtStorage } from "../../utils/jwt_storage";

export const NavbarLinks = [
  { name: "Beranda", link: "/" },
  { name: "Tentang", link: "/about" },
  { name: "Destinasi", link: "/blogs" },
  { name: "Berita", link: "/berita" },
  { name: "Travel", link: "/travel" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoggedIn, userProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // const doLogout = () => {
  //   jwtStorage.removeItem();
  //   navigate("/login");
  // };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-4 font-bold text-2xl">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="Logo" className="h-16" />
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

            {/* Actions Section */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                userProfile?.role === "admin" ? (
                  <div className="flex items-center gap-4">
                    <NavLink to="/wisataCRUD">
                      <button className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full">
                        Admin
                      </button>
                    </NavLink>
                    <Button onClick={logout} className="flex items-center gap-2">
                      <LogoutOutlined />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <NavLink to="/profile">
                      <img
                        src={`http://localhost:5000/static/show_image/${userProfile.images}` || ProfilePic}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border-2 border-primary cursor-pointer"
                      />
                    </NavLink>
                    <Button onClick={logout} className="flex items-center gap-2">
                      <LogoutOutlined />
                      <span>Logout</span>
                    </Button>
                  </div>
                )
              ) : (
                <button
                  onClick={showModal}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full">
                  Akun
                </button>
              )}

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

      {/* Modal Pop-Up for Sign In or Sign Up */}
      <Modal
        title="Pilih Opsi"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered>
        <div className="text-center">
          <p>Silakan pilih untuk Sign In atau Sign Up:</p>
          <div className="flex justify-center gap-4">
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg"
              onClick={handleCancel}>
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg"
              onClick={handleCancel}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
