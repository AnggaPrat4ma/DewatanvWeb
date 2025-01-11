import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Card, Typography, Spin, notification, Row, Col, Tabs, Tag, Button, Modal, Form, Input, Select, Rate, Upload } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../providers/AuthProvider";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const DetailTravel = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wisata, setWisata] = useState([]);
  const [jenis, setJenis] = useState([]);
  const [loadingWisata, setLoadingWisata] = useState(true);
  const [loadingJenis, setLoadingJenis] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { userProfile } = useContext(AuthContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (formValues) => {
    try {
      const formData = new FormData();
      formData.append("full_name", formValues.full_name);
      formData.append("alamat", formValues.alamat);
      formData.append("id_jenis", formValues.id_jenis);
      formData.append("gambar", formValues.gambar.file); // Use file from the upload
      formData.append("jumlah", formValues.jumlah);
      // formData.append("id_user", formValues.id_user); // Assuming `userProfile.id` contains the logged-in user's ID
      formData.append("id_user", userProfile.id_user)
      formData.append("id_paket", travel.id_paket); // Extract from `travel`
      formData.append("nama_paket", travel.nama_paket); // Optional if API doesn't need it

      const response = await fetch("http://localhost:5000/api/form/create", {
        method: "POST",
        body: formData,
        // headers: {
        //   Authorization: `Bearer ${userProfile.token}`, // Assuming `userProfile.token` contains the JWT
        // },
      });

      const result = await response.json();

      if (result.message === "Inserted") {
        notification.success({
          message: "Booking Berhasil",
          description: "Terima kasih telah memilih paket kami! Silakan cek email Anda untuk detail lebih lanjut.",
        });
        setIsModalVisible(false);
      } else {
        notification.error({
          message: "Gagal Membuat Pemesanan",
          description: result.err_message || "Terjadi kesalahan saat membuat pemesanan.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Kesalahan Server",
        description: "Terjadi kesalahan saat memproses permintaan.",
      });
    }
  };

  console.log({test: userProfile});
  


  useEffect(() => {
    const fetchTravelDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/travel/read/${id}`);
        const result = await response.json();

        if (result.message === "OK") {
          setTravel(result.data);
          form.setFieldsValue({ id_paket: result.data.id }); // Set nilai id_paket berdasarkan data travel
        } else {
          notification.error({
            message: "Gagal Memuat Data",
            description: result.err_message || "Paket travel tidak ditemukan.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Kesalahan Server",
          description: "Terjadi kesalahan saat memuat data paket travel.",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchWisataByPaket = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/wisata/read_by_paket/${id}`);
        const result = await response.json();

        if (result.message === "OK") {
          setWisata(result.datas);
        } else {
          notification.warning({
            message: "Data Wisata Tidak Ditemukan",
            description: "Tidak ada data wisata untuk paket ini.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Kesalahan Server",
          description: "Terjadi kesalahan saat memuat data wisata.",
        });
      } finally {
        setLoadingWisata(false);
      }
    };

    const fetchJenis = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jenis/read");
        const result = await response.json();

        if (result.message === "OK") {
          setJenis(result.datas);
        } else {
          notification.warning({
            message: "Data Jenis Tidak Ditemukan",
            description: "Tidak ada data jenis yang tersedia.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Kesalahan Server",
          description: "Terjadi kesalahan saat memuat data jenis.",
        });
      } finally {
        setLoadingJenis(false);
      }
    };

    fetchTravelDetail();
    fetchWisataByPaket();
    fetchJenis();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!travel) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography.Text type="danger">Paket travel tidak ditemukan</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", marginTop: "100px" }}>
      <Card
        cover={
          <img
            alt={travel.nama_paket}
            src={`http://localhost:5000/static/show_image/${travel.gambar}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        }
        style={{
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "10px" }}>
          {travel.nama_paket}
        </Title>
        <Paragraph style={{ textAlign: "center", fontSize: "16px" }}>
          <Text type="secondary">{travel.deskripsi_pkt}</Text>
        </Paragraph>
        <Paragraph style={{ textAlign: "center" }}>
          <Tag color="blue">
            <CheckCircleOutlined /> Rating: {travel.rating_paket}/5
          </Tag>
        </Paragraph>
        <NavLink to="/travel" style={{ color: "#1890ff", display: "block", textAlign: "center", marginTop: "10px" }}>
          &larr; Kembali ke daftar paket travel
        </NavLink>
      </Card>

      <div style={{ marginTop: "30px" }}>
        <Title level={3}>Destinasi Wisata</Title>
        {loadingWisata ? (
          <Spin size="small" />
        ) : wisata.length > 0 ? (
          <Row gutter={[16, 16]}>
            {wisata.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.nama_wisata}
                      src={item.gambar}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  }
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card.Meta
                    title={<Text strong>{item.nama_wisata}</Text>}
                    description={
                      <Paragraph ellipsis={{ rows: 2 }}>
                        <InfoCircleOutlined style={{ marginRight: "5px" }} />
                        {item.deskripsi}
                      </Paragraph>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Typography.Text type="warning">
            Tidak ada data wisata yang tersedia untuk paket ini.
          </Typography.Text>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <Row gutter={[16, 16]}>
          {/* Jenis Paket */}
          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Jenis Paket</Title>}
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {loadingJenis ? (
                <Spin size="small" />
              ) : (
                <Tabs defaultActiveKey="1" type="card" centered>
                  {jenis.map((item) => (
                    <TabPane tab={<Text strong>{item.nama_jenis}</Text>} key={item.id_jenis}>
                      <Card
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Paragraph>
                          <ul>
                            {item.fasilitas.split(', ').map((fasilitas, index) => (
                              <li key={index}>{fasilitas}</li>
                            ))}
                          </ul>
                        </Paragraph>
                        <Paragraph>
                          <Tag color="gold">
                            <DollarCircleOutlined /> Harga: Rp{item.price.toLocaleString()}
                          </Tag>
                        </Paragraph>
                      </Card>
                    </TabPane>
                  ))}
                </Tabs>
              )}
            </Card>
          </Col>

          {/* Booking */}
          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Pesan Sekarang</Title>}
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Paragraph>
                Nikmati pengalaman perjalanan yang tak terlupakan dengan paket terbaik kami. Klik tombol di bawah ini
                untuk melakukan booking.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: "5px", fontWeight: "bold" }}
                onClick={showModal}
              >
                Booking Sekarang
              </Button>
              <Modal
                title="Form Booking"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Batal
                  </Button>,
                  <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  form={form}
                  onFinish={handleOk}
                  initialValues={{ jumlah: 1, nama_paket: travel.nama_paket}}
                >
                  <Form.Item
                    label="Nama Paket"
                    name="nama_paket"
                    rules={[{ required: true, message: "Nama paket diperlukan" }]}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Nama Lengkap"
                    name="full_name"
                    rules={[{ required: true, message: "Nama lengkap diperlukan" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Jumlah Orang"
                    name="jumlah"
                    rules={[{ required: true, message: "Jumlah wajib diisi" }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                  <Form.Item
                    label="Alamat"
                    name="alamat"
                    rules={[{ required: true, message: "Alamat diperlukan" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Jenis Paket"
                    name="id_jenis"
                    rules={[{ required: true, message: "Jenis paket diperlukan" }]}
                  >
                    <Select>
                      {jenis.map((item) => (
                        <Select.Option key={item.id_jenis} value={item.id_jenis}>
                          {item.nama_jenis}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Gambar"
                    name="gambar"
                    rules={[{ required: true, message: "Gambar diperlukan" }]}
                  >
                    <Upload
                      name="gambar"
                      listType="picture"
                      maxCount={1}
                      beforeUpload={() => false} // File tidak langsung diunggah
                    >
                      <Button>Unggah Gambar</Button>
                    </Upload>
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailTravel;
