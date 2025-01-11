import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Card, Typography, Spin, notification } from "antd";

const { Title, Paragraph } = Typography;

const DetailBerita = () => {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/berita/read/${id}`);
        const result = await response.json();

        if (result.message === "OK") {
          setBerita(result.data);
        } else {
          notification.error({
            message: "Gagal Memuat Data",
            description: result.err_message || "Berita tidak ditemukan.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Kesalahan Server",
          description: "Terjadi kesalahan saat memuat data berita.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!berita) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography.Text type="danger">Berita tidak ditemukan</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", marginTop: "100px" }}>
      <Card
        cover={
          <img
            alt={berita.judul}
            src={`http://localhost:5000/static/show_image/${berita.image}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
        }
      >
        <Title level={3}>{berita.judul}</Title>
        <Paragraph>{berita.deskripsi}</Paragraph>
        <Paragraph>
          <strong>Sumber:</strong>{" "}
          <a href={berita.source} target="_blank" rel="noopener noreferrer">
            {berita.source}
          </a>
        </Paragraph>
        <NavLink to="/berita" style={{ color: "#1890ff" }}>
          &larr; Kembali ke daftar berita
        </NavLink>
      </Card>
    </div>
  );
};

export default DetailBerita;
