import React, { useEffect, useState } from "react";
import { notification, Input, Rate } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getDataPrivate } from "../../utils/api";

const { Search } = Input;

const TravelCard = ({ nama_paket, deskripsi_pkt, rating_paket, gambar, onClick }) => {
  return (
    <div
      className="flex items-center gap-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
      style={{ width: "100%" }}
    >
      {/* Gambar */}
      <img
        src={`http://localhost:5000/static/show_image/${gambar}`} // Disesuaikan dengan path gambar dari backend
        alt={nama_paket}
        className="w-40 h-32 object-cover rounded-l-lg"
      />
      {/* Detail */}
      <div className="flex flex-col justify-center p-4 flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
          {nama_paket}
        </h3>
        <p className="text-gray-500 text-sm">{deskripsi_pkt}</p>
        <Rate disabled defaultValue={rating_paket} style={{ fontSize: "14px" }} />
      </div>
    </div>
  );
};

const Travel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [beritas, setBeritas] = useState([]);
  const [filteredBeritas, setFilteredBeritas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
      getDataPrivate("/api/travel/read")
      .then((resp) => {
        if (resp) {
          setBeritas(resp.datas);
          setFilteredBeritas(resp.datas);
        }
      })
      .catch((err) => {
        console.log(err)
        notification.error({ message: "Gagal memuat data" })
      });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = beritas.filter((berita) =>
      berita.nama_paket.toLowerCase().includes(value.toLowerCase())
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
          Paket Perjalanan Terbaru
        </h1>

        {location.pathname === "/berita" && (
          <Search
            placeholder="Cari berdasarkan nama paket"
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
          {filteredBeritas.map((berita) => (
            <TravelCard
              key={berita.id_paket}
              nama_paket={berita.nama_paket}
              deskripsi_pkt={berita.deskripsi_pkt}
              rating_paket={berita.rating_paket}
              gambar={berita.gambar}
              onClick={() => navigate(`/travel/${berita.id_paket}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Travel;