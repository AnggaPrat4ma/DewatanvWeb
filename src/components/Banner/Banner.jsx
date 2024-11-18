import React from "react";
import TravelImg from "../../../images/A.png"; // Ganti dengan path yang sesuai
import {
  ShopOutlined, // Icon untuk shopping
  BranchesOutlined, // Icon untuk wisata alam
  GlobalOutlined, // Icon untuk wisata budaya
  ApartmentOutlined, // Icon untuk hotel atau akomodasi
} from "@ant-design/icons";

const Banner = () => {
  return (
    <div className="min-h-[550px] bg-gray-100">
      <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image section */}
            <div data-aos="flip-up">
              <img
                src={TravelImg}
                alt="Wisata Bali"
                className="w-full max-w-[450px] aspect-square mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] rounded-xl" // Menambahkan rounded-lg
              />
            </div>
            {/* Text content section */}
            <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
              <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
                Jelajahi Semua Keindahan Bali Bersama Kami
              </h1>
              <p
                data-aos="fade-up"
                className="text-sm text-gray-500 tracking-wide leading-8"
              >
                Temukan berbagai destinasi menarik di Bali dengan mudah. Nikmati
                keindahan alam, budaya, dan pantai yang memukau, semuanya dalam
                satu platform.
              </p>
              <div data-aos="zoom-in" className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <BranchesOutlined className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                    <p>Pemandangan Alam</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ApartmentOutlined className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-blue-100 dark:bg-blue-400" />
                    <p>Akomodasi</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <ShopOutlined className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                    <p>Shopping</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <GlobalOutlined className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-red-100 dark:bg-red-400" />
                    <p>Wisata Budaya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
