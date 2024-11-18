import React from "react";
import { Input, Button } from "antd";

const Hero = () => {
  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center text-center text-white">
            <p data-aos="fade-up" className="text-sm">
              Our Packages
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-3xl"
            >
              Search Your Destination
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 bg-white rounded-md p-4 relative max-w-lg mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">
              <div className="col-span-full">
                <label htmlFor="destination" className="opacity-70">
                  Search your Destination
                </label>

                <Input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Dubai"
                  className="w-full my-2"
                  size="large"
                />
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              shape="round"
              className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 absolute -bottom-5 left-1/2 transform -translate-x-1/2 shadow-lg"
              style={{
                background: "linear-gradient(to right, #4A90E2, #9013FE)",
                border: "none",
              }}
            >
              Search Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
