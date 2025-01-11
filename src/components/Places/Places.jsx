import React, { useEffect, useState } from "react";
import { notification, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;

const BeritaCard = ({ judul, kategori, waktu, gambar, onClick }) => {
  return (
    <div
      className="flex items-center gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
      style={{ width: "100%" }}
    >
      {/* Gambar */}
      <img
        src={gambar}
        alt={judul}
        className="w-40 h-32 object-cover rounded-l-lg"
      />
      {/* Detail */}
      <div className="flex flex-col justify-center p-4 flex-1">
        <div className="text-sm mb-1">
          <span
            className={`font-bold uppercase ${
              kategori === "HYPE" ? "text-red-500" : "text-blue-500"
            }`}
          >
            {kategori}
          </span>{" "}
          <span className="text-gray-500">{waktu}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
          {judul}
        </h3>
      </div>
    </div>
  );
};

const Berita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [beritas, setBeritas] = useState([]);
  const [filteredBeritas, setFilteredBeritas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/berita/read");
      const data = await response.json();
      if (data.message === "OK") {
        setBeritas(data.datas);
        setFilteredBeritas(data.datas);
      } else {
        notification.error({ message: "Gagal memuat data" });
      }
    } catch (error) {
      notification.error({ message: "Terjadi kesalahan saat mengambil data" });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = beritas.filter((berita) =>
      berita.judul.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBeritas(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold flex justify-between items-center">
          Berita Terbaru Kami
        </h1>

        {location.pathname === "/berita" && (
          <Search
            placeholder="Cari berdasarkan judul berita"
            allowClear
            enterButton="Cari"
            size="large"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        )}

        {/* List Layout */}
        <div className="flex flex-col gap-4">
          {filteredBeritas
            .slice(0, location.pathname === "/" ? 6 : filteredBeritas.length)
            .map((berita) => (
              <BeritaCard
                key={berita.id_berita}
                judul={berita.judul}
                gambar={`http://localhost:5000/static/show_image/${berita.image}`}
                onClick={() => navigate(`/berita/${berita.id_berita}`)}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Berita;
