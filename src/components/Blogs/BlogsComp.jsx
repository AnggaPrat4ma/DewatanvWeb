import React, { useEffect, useState } from "react";
import { Card, Modal, notification, Input, Typography, Skeleton, Rate } from "antd";
import { useLocation } from "react-router-dom";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;
const { Search } = Input;

const BlogCard = ({ nama_wisata, deskripsi, gambar, rating_wisata, onClick }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={nama_wisata}
          src={gambar}
          style={{
            width: "100%", // Sesuaikan agar gambar mengikuti lebar card
            height: "200px", // Tentukan tinggi gambar
            objectFit: "cover", // Agar gambar tidak terdistorsi
          }}
        />
      }
      onClick={onClick}
    >
      <Paragraph
        strong
        ellipsis={{
          rows: 1,
          tooltip: nama_wisata,
        }}
        style={{ marginBottom: "4px" }}
      >
        {nama_wisata}
      </Paragraph>
      <Rate disabled defaultValue={rating_wisata} style={{ marginBottom: "8px" }} />
      <Paragraph
        ellipsis={{
          rows: 2,
          tooltip: deskripsi,
        }}
        style={{ color: "rgba(0, 0, 0, 0.45)" }}
      >
        {deskripsi}
      </Paragraph>
    </Card>
  );
};

const BlogsComp = () => {
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/wisata/read");
      const data = await response.json();
      if (data.message === "OK") {
        setBlogs(data.datas);
        setFilteredBlogs(data.datas);
      } else {
        notification.error({ message: "Gagal memuat data" });
      }
    } catch (error) {
      notification.error({ message: "Terjadi kesalahan saat mengambil data" });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = blogs.filter((blog) =>
      blog.nama_wisata.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowDetails = (blog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const extractYouTubeID = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/i);
    return match ? match[1] : null;
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold flex justify-between items-center">
          Destinasi Terbaru Kami
          {location.pathname === "/" && (
            <a
              href="/blogs"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "4px", // Memberi jarak antara teks dan ikon
                color: "#1890ff", // Warna teks sesuai dengan tema Ant Design
              }}
              onMouseEnter={(e) => (e.target.style.color = "#40a9ff")} // Animasi hover
              onMouseLeave={(e) => (e.target.style.color = "#1890ff")}
            >
              Lihat Semua <RightOutlined />
            </a>
          )}
        </h1>

        {location.pathname === "/blogs" && (
          <Search
            placeholder="Cari berdasarkan nama destinasi"
            allowClear
            enterButton="Cari"
            size="large"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredBlogs
            .slice(0, location.pathname === "/" ? 6 : filteredBlogs.length)
            .map((blog) => (
              <BlogCard
                key={blog.id_play}
                {...blog}
                onClick={() => handleShowDetails(blog)}
              />
            ))}
        </div>
      </section>
      <Modal
        title={selectedBlog?.nama_wisata}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedBlog ? (
          <>
            <div style={{ marginBottom: "16px", textAlign: "center" }}>
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${extractYouTubeID(
                  selectedBlog.video
                )}`}
                title={selectedBlog.nama_wisata}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Rate disabled defaultValue={selectedBlog.rating_wisata} />
            <Title level={4}>Deskripsi:</Title>
            <Paragraph>{selectedBlog.deskripsi}</Paragraph>
          </>
        ) : (
          <Skeleton active />
        )}
      </Modal>
    </div>
  );
};

export default BlogsComp;
