import React from "react";

const Hero = () => {
  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          {/* Teks Pembuka */}
          <div className="flex flex-col items-center justify-center text-center text-white space-y-4">
            <p
              data-aos="fade-up"
              className="text-4xl font-bold uppercase tracking-wide"
            >
              Dewata Trails
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-lg italic opacity-90"
            >
              "Menyempurnakan Jejak Anda di Tanah Dewata, Biarkan Cerita
              Dimulai!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
