import React from "react";
import Slider from "react-slick";
import Img1 from "../../assets/default.jpg";

const testimonialData = [
  {
    id: 1,
    name: "Prayoga",
    text: "Sangat membantu dalam merencanakan liburan saya di Bali. Informasi yang diberikan sangat lengkap dan akurat, mulai dari tempat wisata hingga tips perjalanan. Sangat direkomendasikan!",
    img: Img1,
  },
  {
    id: 2,
    name: "Angga",
    text: "Website ini sangat informatif dan mudah digunakan. Saya menemukan banyak tempat wisata baru yang belum pernah saya kunjungi sebelumnya. Pelayanannya luar biasa!",
    img: Img1,
  },
  {
    id: 3,
    name: "Lia",
    text: "Panduan wisata yang diberikan benar-benar membantu. Saya bisa menjelajahi Bali dengan lebih mudah dan mendapatkan pengalaman yang tak terlupakan. Terima kasih banyak!",
    img: Img1,
  },
  {
    id: 4,
    name: "Bhathiya",
    text: "Sebagai pengunjung internasional, website ini menjadi panduan utama saya di Bali. Informasi destinasi wisata dan budaya sangat detail dan menarik. Layanan yang sangat profesional!",
    img: Img1,
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div data-aos="fade-up" data-aos-duration="300" className="py-10">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Testimonial
          </p>
          <h1 className="text-3xl font-bold">Apa Kata Mereka?</h1>
          <p className="text-xs text-gray-400">
            Dengarkan pengalaman luar biasa dari para wisatawan yang menggunakan
            panduan kami untuk menjelajahi keindahan Bali.
          </p>
        </div>
        {/* Testimonial Section */}
        <div
          data-aos="zoom-in"
          data-aos-duration="300"
          className="grid grid-cols-1 max-w-[800px] mx-auto gap-6"
        >
          <Slider {...settings}>
            {testimonialData.map(({ id, name, text, img }) => (
              <div key={id} className="my-6">
                <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <img
                    src={img}
                    alt={name}
                    className="rounded-full block mx-auto h-24 w-24 object-cover"
                  />
                  <h1 className="text-xl font-bold">{name}</h1>
                  <p className="text-gray-500 text-sm">{text}</p>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
