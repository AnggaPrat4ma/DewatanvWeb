import React, { useState } from "react";
import FooterLogo from "../../../images/nobg.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { UpOutlined } from "@ant-design/icons";
import Img1 from "../../assets/team/lia.jpg";
import Img2 from "../../assets/team/prayoga.png";
import Img3 from "../../assets/team/batok.jpg";
import Img4 from "../../assets/team/batok.jpg";

// Data footer links
const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "News",
    link: "/news",
  },
  {
    title: "Blogs",
    link: "/blogs",
  },
];

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const handleScrollTo = (id) => {
    setLoading(true);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom 1: Logo dan Deskripsi */}
        <div className="flex flex-col items-center md:items-start md:px-5">
          <div className="flex items-center mb-4">
            <img src={FooterLogo} alt="Logo" className="w-16" />
            <h2 className="text-white font-bold text-lg ml-3">Dewata Trails</h2>
          </div>
          <p className="text-sm text-center md:text-left mt-2 font-bold">
            Menyempurnakan Jejak Anda di Tanah Dewata, Biarkan Cerita Dimulai!
          </p>
          <div className="flex mt-4 gap-3">
            <a
              href="https://www.facebook.com"
              className="bg-blue-600 p-2 rounded-full"
            >
              <FaFacebook className="text-white text-lg" />
            </a>
            <a
              href="https://www.instagram.com"
              className="p-2 rounded-full"
              style={{
                background:
                  "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              <FaInstagram className="text-white text-lg" />
            </a>
            <a
              href="https://www.youtube.com"
              className="bg-red-600 p-2 rounded-full"
            >
              <FaYoutube className="text-white text-lg" />
            </a>
          </div>
        </div>

        {/* Kolom 2: Explore Links */}
        <div className="flex flex-col items-center md:items-start md:px-5 md:ml-10">
          <div className="text-white mb-4">
            <h2 className="font-bold text-lg">Explore Links</h2>
          </div>
          <div className="text-sm text-center md:text-left">
            {FooterLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="text-white hover:underline block mt-2"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 3: Album Galeri */}
        <div className="flex flex-col items-center md:items-start md:px-5">
          <div className="text-white mb-4">
            <h2 className="font-bold text-lg">Album Galeri</h2>
          </div>
          <div className="flex gap-2 justify-center md:justify-start mb-4">
            <img src={Img1} alt="" className="w-16 h-16 object-cover rounded" />
            <img src={Img2} alt="" className="w-16 h-16 object-cover rounded" />
            <img src={Img3} alt="" className="w-16 h-16 object-cover rounded" />
            <img src={Img4} alt="" className="w-16 h-16 object-cover rounded" />
          </div>
        </div>
      </div>
      {/* Tombol Scroll ke Atas */}
      <div className="fixed bottom-5 right-5">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Menghindari perilaku default href="#"
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth", // Menambahkan efek scroll pelan
            });
          }}
          className="p-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 transition duration-200 shadow-lg"
        >
          <UpOutlined className="text-white text-xl" />
        </a>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="animate-spin border-4 border-t-4 border-white w-16 h-16 rounded-full"></div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
