import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Input, Rate } from "antd";
import { useLocation } from "react-router-dom";

import Img1 from "../../assets/places/img1.jpg";
import Img2 from "../../assets/places/img2.jpg";
import Img3 from "../../assets/places/jatiluwih.jpg";
import Img4 from "../../assets/places/img4.jpg";
import Img5 from "../../assets/places/img5.jpg";
import Img6 from "../../assets/places/img6.jpg";
import Img7 from "../../assets/places/img7.jpeg";
import Img8 from "../../assets/places/img8.jpeg";
import Img9 from "../../assets/places/img9.jpg";

const { Search } = Input;

const PlacesData = [
  {
    img: Img1,
    title:
      "10 Rekomendasi Pantai Berpasir Putih di Nusa Dua, Wajib ke Sini Walau Sekali",
    location: "Bali",
    description:
      "Badung - Wilayah Bali Selatan terkenal dengan pantainya yang memiliki pemandangan tebing atau batu karang yang indah. Salah satu wilayah Bali Selatan yang memiliki banyak pantai tersembunyi yang indah adalah Nusa Dua. Sekilas Tentang Wilayah Nusa Dua. Dikutip dari badungtourism.badungkab.go.id, Nusa Dua merupakan kawasan di ujung bagian tenggara Pulau Bali. Lokasinya berjarak sekitar 40 kilometer (km) dari pusat kota Denpasar. Daerah elite ini memiliki luas sekitar 350 hektare yang dikembangkan oleh In Journey Tourism Development Corporation (ITDC). Banyak hotel bintang 5 dan pusat konvensi di kawasan tersebut. Tidak heran wilayah ini sering digunakan untuk acar internasional. Nusa Dua merupakan nama dari dua pulau kecil yang dipisahkan oleh pasir putih. Nusa Dua adalah daerah pertama di wilayah Asia-Pasifik yang mendapatkan 'Green Globe' atau sertifikat tempat wisata ramah lingkungan.",
    type: "Cultural Relax",
    link: "https://www.detik.com/bali/wisata/d-7608035/10-rekomendasi-pantai-berpasir-putih-di-nusa-dua-wajib-ke-sini-walau-sekali",
  },
  {
    img: Img2,
    title: "Bernama Pantai Jerman tapi Ada di Dekat Bandara Bali, Ini Ceritanya",
    location: "Pantai Jerman, Badung",
    description:
      "Badung - Ada sebuah pantai memiliki nama bernuansa asing di Bali. Adalah Pantai Jerman yang letaknya berada di sisi Bandara Internasional I Gusti Ngurah Rai, Bali, berikut cerita di baliknya. Bali dikenal sebagai surganya wisata tropis karena memiliki banyak pantai yang menarik. Namun, mungkin belum banyak orang melirik akan hadirnya sebuah pantai yang berada di dekat bandara dan memiliki nama tak biasa yakni Pantai Jerman. Pantai Jerman terletak hanya sekitar 1,5 km dari Bandara Internasional I Gusti Ngurah Rai. Jika berjalan kaki, traveler bisa mencapainya sekitar 20 menit. Sementara jika menggunakan kendaraan seperti mobil dan motor, waktu tempuh hanya sekitar 10-20 menit.",
    type: "Cultural Relax",
    link: "https://travel.detik.com/domestic-destination/d-7633836/bernama-pantai-jerman-tapi-ada-di-dekat-bandara-bali-ini-ceritanya",
  },
  {
    img: Img3,
    title:
      "Wamen Kebudayaan Giring Ganesha Hadiri Subak Spirit Festival di Jatiluwih",
    location: "Jatiluwih",
    description:
      "Tabanan - Subak Spirit Festival yang digelar di Daya Tarik Wisata (DTW) Jatiluwih, Desa Jatiluwih, Kecamatan Penebel, Tabanan, menjadi salah satu acara budaya yang memperkenalkan kekayaan budaya dan kuliner khas Jatiluwih serta sekitarnya. Festival yang berlangsung pada 9-10 November 2024 ini, dihadiri langsung oleh Wakil Menteri Kebudayaan Indonesia, Giring Ganesha.",
    type: "Cultural Relax",
    link: "https://www.detik.com/bali/budaya/d-7630202/wamen-kebudayaan-giring-ganesha-hadiri-subak-spirit-festival-di-jatiluwih",
  },
  {
    img: Img4,
    title:
      "14 Februari, Bali Berlakukan Pajak Pariwisata Hijau untuk Turis Asing",
    location: "Bali",
    description:
      "KOMPAS.com - Mulai tanggal 14 Februari 2024, setiap wisatawan internasional yang melakukan perjalanan ke Bali diwajibkan membayar pajak yang berkontribusi terhadap pelestarian budaya dan lingkungan alam Bali. Dilansir dari laman resminya, Senin (12/2/2024), Love Bali, menyarankan wisatawan untuk melakukan pembayaran sebesar Rp 150.000 atau ekuivalen 9,60 dollar AS per orang, sebelum kedatangan mereka di Bali untuk memfasilitasi proses perjalanan yang lebih lancar. Artikel ini telah tayang di Kompas.com dengan judul '14 Februari, Bali Berlakukan Pajak Pariwisata Hijau untuk Turis Asing', Klik untuk baca: https://lestari.kompas.com/read/2024/02/12/110000186/14-februari-bali-berlakukan-pajak-pariwisata-hijau-untuk-turis-asing.",
    type: "Cultural Relax",
    link: "https://lestari.kompas.com/read/2024/02/12/110000186/14-februari-bali-berlakukan-pajak-pariwisata-hijau-untuk-turis-asing",
  },
  {
    img: Img5,
    title:
      "Pura Air Terbesar Bali di Tengah Danau Suci Baratan",
    location: "Danau Baratan, Tabanan",
    description:
      "Danau Beratan di kawasan Bedugul, Kabupaten Tabanan, selepas siang itu terlihat tenang. Hanya sesekali permukaan airnya nampak beriak, ketika speed boat melintas. Namun menjelang senja kabut turun menyelimuti permukaan danau, seketika kesan magis bergiliran mendominasi. Seakan ada misteri yang tersembunyi dalam kedalaman danau, dengan pura air yang berdiri megah di tengahnya. Pura Ulun Danu, bila ditinjau dari segi etimologi berarti pura di atas danau. Pura ikonik yang gambarnya tercetak pada mata uang pecahan lima puluh ribu rupiah ini adalah salah satu pura air terbesar di Pulau Bali, pulau yang belum lama ini dinobatkan sebagai pulau terindah ketiga di dunia setelah Maldives dan Phu Quoc di Vietnam yang layak dijadikan tujuan travelling tahun ini.",
    type: "Cultural Relax",
    link: "https://hot.detik.com/celeb/d-7618483/saat-menegangkan-anak-drummer-matta-band-terseret-ombak-kelingking-beach",
  },
  {
    img: Img6,
    title: "Ini 7 Kategori WNA yang Tidak Kena Pungutan Turis Asing di Bali",
    location: "Bali",
    description:
      "KOMPAS.com - Pemerintah Provinsi Bali akan menerapkan pungutan wajib untuk wisatawan mancanegara (wisman) sebesar Rp 150.000 per orang mulai Rabu (14/2/2024). Namun, ada tujuh kategori warga negara asing (WNA) yang tidak akan kena aturan itu. 'Mereka (wisman) wajib mengajukan permohonan dengan melengkapi persyaratan yang ditentukan dalam sistem Love Bali,'' kata Kepala Bidang Pemasaran Pariwisata Dinas Pariwisata Provinsi Bali, Ida Ayu Indah Yustikarini, dikutip dari Antara, Senin (12/2/2024).",
    type: "Cultural Relax",
    link: "https://travel.kompas.com/read/2024/02/12/183500727/ini-7-kategori-wna-yang-tidak-kena-pungutan-turis-asing-di-bali",
  },
  {
    img: Img7,
    title: "Libatkan 1.200 Seniman, Bali Street Carnival Jadi Side Event World Water Forum 2024",
    location: "Bali Street Carnival",
    description:
      "KOMPAS.com - Pawai budaya Bali Street Carnival pada Senin (20/5/2024) di Bali Collection, Nusa Dua, menjadi side event World Water Forum (WWF) ke-10 yang masih berlangsung di Bali sampai Sabtu (25/5/2024).  Pawai budaya ini menghadirkan beragam kesenian Bali dengan tema 'Samudera Cipta Peradaban'.",
    type: "Cultural Relax",
    link: "https://travel.kompas.com/read/2024/05/22/150848227/libatkan-1200-seniman-bali-street-carnival-jadi-side-event-world-water-forum",
  },
  {
    img: Img8,
    title: "5 Tempat Wisata di Bali Disiapkan untuk Delegasi World Water Forum",
    location: "Bali",
    description:
      "KOMPAS.com - Sejumlah tempat wisata di Bali disiapkan untuk kunjungan delegasi World Water Forum (WWF) ke-10 pada Mei 2024 mendatang, tepatnya dari Sabtu (18/4/2024) sampai Sabtu (25/4/2024). Sejauh ini sudah ada lima tempat, yang mampu menampung sekitar 100 pengunjung dan 20 bus, dengan dua karyawisata.",
    type: "Cultural Relax",
    link: "https://travel.kompas.com/read/2024/04/27/122639027/5-tempat-wisata-di-bali-disiapkan-untuk-delegasi-world-water-forum",
  },
  {
    img: Img9,
    title: "  Cocok untukmu kaum vegetarian! Denpasar di Bali Masuk Daftar Kota dengan Restoran Vegetarian Terbanyak di Dunia",
    location: "Denpasar, Bali",
    description:
      "KOMPAS.com - Denpasar, Bali, berada di peringkat ketiga dari daftar 10 kota dengan opsi restoran plant-based paling banyak di dunia, menurut operator tur asal Inggris Titan Travel. 'Denpasar adalah ibu kota Bali, (daerah) tujuan wisata yang populer karena pantainya yang indah dan harga yang terjangkau; kota ini memiliki pilihan tertinggi ketiga untuk vegetarian dan vegan,'' bunyi keterangan dari laman resmi Titan Travel, dikutip Sabtu (3/2/2024).",
    type: "Cultural Relax",
    link: "https://www.kompas.com/food/read/2024/02/03/112353575/denpasar-di-bali-masuk-daftar-kota-dengan-restoran-vegetarian-terbanyak-di",
  },
];

const Places = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [searchText, setSearchText] = useState("");
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const showModal = (item) => {
    setModalContent(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRatingChange = (value, title) => {
    setRatings({
      ...ratings,
      [title]: value,
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = (title) => {
    setComments({
      ...comments,
      [title]: [...(comments[title] || []), comment],
    });
    setComment(""); // Reset field setelah komentar ditambahkan
  };

  const filteredPlaces = PlacesData.filter(
    (place) =>
      place.title.toLowerCase().includes(searchText.toLowerCase()) ||
      place.description.toLowerCase().includes(searchText.toLowerCase()) ||
      place.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Berita Terkini
        </h1>

        {location.pathname === "/best-places" && (
          <Search
            placeholder="Cari berdasarkan nama berita"
            allowClear
            enterButton="Cari"
            size="large"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        )}

        {/* Grid Cards */}
        <Row gutter={[16, 16]}>
          {filteredPlaces.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                hoverable
                onClick={() => showModal(item)}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                cover={
                  <img
                    alt={item.title}
                    src={item.img}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      margin: 0,
                    }}
                  />
                }
              >
                <Card.Meta
                  title={item.title}
                  description={item.location}
                  style={{
                    marginTop: "10px",
                    padding: "0 10px",
                  }}
                />
                <div className="my-2" style={{ padding: "0 10px" }}>
                  <Rate
                    value={ratings[item.title] || 0}
                    onChange={(value) => handleRatingChange(value, item.title)}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for Details */}
        <Modal
          title={modalContent.title}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
            <Button
              key="link"
              type="primary"
              href={modalContent.link}
              target="_blank"
            >
              Read More
            </Button>,
          ]}
        >
          <img
            alt={modalContent.title}
            src={modalContent.img}
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
          <p className="mt-4">{modalContent.description}</p>

          {/* Komentar */}
          <div className="mt-4">
            <Input.TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tambahkan komentar..."
            />
            <Button
              type="primary"
              onClick={() => handleAddComment(modalContent.title)}
              style={{ marginTop: "10px" }}
            >
              Tambah Komentar
            </Button>
            <div className="mt-4">
              {comments[modalContent.title]?.map((comment, index) => (
                <div key={index} className="p-2 mb-2 border-b">
                  {comment}
                </div>
              ))}
            </div>
          </div>
        </Modal>
        {/* Menggunakan :hover untuk menampilkan overlay dengan deskripsi lengkap */}
        <style jsx>{`
          .ant-card:hover .overlay {
            opacity: 1; /* Menampilkan overlay saat hover */
            visibility: visible; /* Menampilkan overlay saat hover */
          }

          .ant-card:hover {
            transform: scale(1.05); /* Membesarkan card sedikit saat hover */
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); /* Menambahkan bayangan lebih besar saat hover */
          }
        `}</style>
      </section>
    </div>
  );
};

export default Places;
