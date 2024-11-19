import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Input, Rate } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

import Img1 from "../../assets/places/mangrove.jpg";
import Img2 from "../../assets/places/turis.jpeg";
import Img3 from "../../assets/places/jatiluwih.jpg";
import Img4 from "../../assets/places/bandara.jpeg";
import Img5 from "../../assets/places/ombak.jpeg";
import Img6 from "../../assets/places/kebakaran.jpeg";

const PlacesData = [
  {
    img: Img1,
    title:
      "Bali Dilarang Obral Izin Bangunan Tepi Pantai dan Sepelekan Mangrove",
    location: "Kuta Utara",
    description:
      "Bali dengan pesona wisata pantai juga dibayangi bencana alam. Pemerintah diminta untuk tidak mengobral izin pembangunan beach club, kafe atau pun hotel di kawasan sempadan pantai, juga diminta untuk mempertahankan hutan mangrove. Belum lama ini, Finns Beach Club di Desa Canggu, Kecamatan Kuta Utara, Badung, Bali, dilaporkan melanggar aturan sempadan pantai.",
    type: "Cultural Relax",
    link: "https://travel.detik.com/travel-news/d-7634356/bali-dilarang-obral-izin-bangunan-tepi-pantai-dan-sepelekan-mangrove",
  },
  {
    img: Img2,
    title: "Turis Swiss Ditendang karena Overstay 275 Hari",
    location: "Singaraja",
    description:
      "Turis asal Swiss ini begitu betah tinggal di Indonesia. Ia overstay ratusan hari hingga akhirnya ditendang pihak berwenang. Dalam siaran resmi Imigrasi, Minggu (10/11/2024), seorang WNA asal Swiss berinisial HED terpaksa dideportasi oleh petugas Imigrasi Singaraja.",
    type: "Cultural Relax",
    link: "https://travel.detik.com/travel-news/d-7631454/turis-swiss-ditendang-karena-overstay-275-hari",
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
      "Bandara di Bali Utara, Bisakah Mengurangi Penumpukan Wisatawan di Selatan?",
    location: "Singaraja",
    description:
      "Presiden Prabowo Subianto berencana membangun bandara di Bali utara untuk mengurangi penumpukan di wisatawan di Bali selatan sekaligus ingin menjadikan Pulau Dewata menjadi new Hong Hong dan new Singapore. Cukup jitukah rencana itu? Prabowo menyatakan rencana pembangunan bandara di Buleleng itu pada saat kunjungan ke Bali akhir pekan lalu, Minggu (3/11/2024). 'Saya sudah menyampaikan bahwa saya berkomitmen saya ingin membangun North Bali International Airport,' ujar Prabowo dalam pidatonya di Restoran Bendega, Denpasar.",
    type: "Cultural Relax",
    link: "https://travel.detik.com/travel-news/d-7626133/bandara-di-bali-utara-bisakah-mengurangi-penumpukan-wisatawan-di-selatan",
  },
  {
    img: Img5,
    title:
      "Saat Menegangkan Anak Drummer Matta Band Terseret Ombak Kelingking Beach",
    location: "Pantai Kelingking, Nusa Penida",
    description:
      "Polisi memberikan kronologi jelas momen-momen menegangkan saat Kaisar Akira Ayman, anak drummer Matta Band, Yadi Bachman alias Wox, terseret ombak besar di Kelingking Beach. Ada upaya dari salah satu teman menolong Kaisar. Perjalanan study tour SMA IT Insan Sejahtera, Sumedang, ke Bali menjadi duka. Kaisar Akira Ayman terseret ombak di Kelingking Beach dan meninggal dunia. Kasi Humas Polres Klungkung Iptu Agus Widiono, menceritakan kronologi peristiwa yang menimpa putra sulung drummer Matta Band itu. Kaisar Akira Ayman bersama dengan rombongan menginap di kawasan Jimbaran, Bali.",
    type: "Cultural Relax",
    link: "https://hot.detik.com/celeb/d-7618483/saat-menegangkan-anak-drummer-matta-band-terseret-ombak-kelingking-beach",
  },
  {
    img: Img6,
    title: "Gunung Agung Kebakaran, Ratusan Hektare Lahan Hangus",
    location: "Gunung Agung, Karangasem",
    description:
      "Gunung Agung Bali kebakaran. Api sudah bisa dikendalikan setelah melahap ratusan hektare lahan. Kebakaran hutan yang terjadi di lereng Gunung Agung, Karangasem, Bali dipastikan sudah padam. Hasil pemantauan, Senin (21/10/2024) pagi, sudah tidak ada lagi titik api yang terlihat. Tercatat, 146 hektare lahan hangus akibat kebakaran yang terjadi selama hampir satu minggu.",
    type: "Cultural Relax",
    link: "https://travel.detik.com/travel-news/d-7599339/gunung-agung-kebakaran-ratusan-hektare-lahan-hangus",
  },
];

const Places = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [ratings, setRatings] = useState({}); // Menyimpan rating setiap tempat
  const [comments, setComments] = useState({}); // Menyimpan komentar setiap tempat
  const [comment, setComment] = useState(""); // Komentar baru yang dimasukkan

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
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Berita Terkini
        </h1>

        {location.pathname === "/best-places" && (
          <Input
          placeholder="Cari berita..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
          style={{ width: "100%", padding: "10px" }}
          suffix={<SearchOutlined />}
        />
        )}

        {/* Input Search */}
        

        {/* Grid Cards */}
        <Row gutter={[16, 16]}>
          {filteredPlaces.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                hoverable
                bordered={false}
                onClick={() => showModal(item)}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                className="shadow-md"
              >
                <div style={{ height: "250px", overflow: "hidden" }}>
                  <img
                    alt={item.title}
                    src={item.img}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <Card.Meta
                  title={item.title}
                  description={item.location}
                  style={{
                    marginTop: "10px",
                  }}
                />
                {/* Menambahkan rating */}
                <div className="my-2">
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
      </section>
    </div>
  );
};

export default Places;
