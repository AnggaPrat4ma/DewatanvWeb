import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Table, message, Spin, Tooltip, Form, Select, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidenav from "../components/Sidebar/sidenav";

const { Option } = Select;

const WisataCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [paketOptions, setPaketOptions] = useState([]);

  // Fetch data wisata
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/wisata/read");
      const data = await response.json();
      setItems(data.datas);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data paket untuk dropdown
  const fetchPaketOptions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/travel/read");
      const data = await response.json();
      setPaketOptions(data.datas); // Asumsi response memiliki properti datas
    } catch (error) {
      message.error("Failed to fetch paket options");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchPaketOptions();
  }, []);

  const handleCreate = async (values) => {
    const formData = new FormData();
    formData.append("nama_wisata", values.nama_wisata);
    formData.append("deskripsi", values.deskripsi);
    formData.append("gambar", values.gambar);
    formData.append("rating_wisata", values.rating_wisata);
    formData.append("video", values.video); // Add video URL to FormData
    formData.append("id_paket", values.id_paket); // Include id_paket in the request

    try {
      const response = await fetch("http://localhost:5000/api/wisata/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setItems([...items, result.data]);
        message.success("Data wisata berhasil ditambahkan!");
        form.resetFields();
        setIsModalVisible(false);
        fetchItems();
      } else {
        message.error(result.message || "Gagal menambahkan data wisata");
      }
    } catch (error) {
      message.error("Gagal menambahkan data wisata");
    }
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("nama_wisata", values.nama_wisata);
    formData.append("deskripsi", values.deskripsi);
    formData.append("gambar", values.gambar);
    formData.append("rating_wisata", values.rating_wisata);
    formData.append("video", values.video);
    formData.append("id_paket", values.id_paket);

    try {
      const response = await fetch(`http://localhost:5000/api/wisata/update/${editingItem.id_wisata}`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        message.success("Data wisata berhasil diperbarui!");
        setIsModalVisible(false);
        setEditingItem(null);
        fetchItems();
      } else {
        message.error(result.message || "Gagal memperbarui data wisata");
      }
    } catch (error) {
      message.error("Gagal memperbarui data wisata");
    }
  };

  const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/wisata/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          message.success("Data berita berhasil dihapus!");
          fetchItems();
        } else {
          message.error("Gagal menghapus data berita");
        }
      } catch (error) {
        message.error("Gagal menghapus data berita");
      }
    };

  const showModal = (mode, record) => {
    setIsModalVisible(true);
    if (mode === "edit") {
      setIsEditing(true);
      setEditingItem(record);
      form.setFieldsValue(record);
    } else {
      setIsEditing(false);
      setEditingItem(null);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Gambar",
      dataIndex: "gambar",
      key: "gambar",
      render: (text) => (
        <img
          src={text}
          alt="Gambar Wisata"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Nama Wisata",
      dataIndex: "nama_wisata",
      key: "nama_wisata",
      render: (text) => (
        <Tooltip title={text} placement="top">
          <div
            style={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      render: (text) => (
        <Tooltip title={text} placement="top">
          <div
            style={{
              maxWidth: "300px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating_wisata",
      key: "rating_wisata",
    },
    {
      title: "Video URL",
      dataIndex: "video",
      key: "video",
      render: (text) => (
        <Tooltip title={text} placement="top">
          <div
            style={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            onClick={() => showModal("edit", record)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            ttitle="Apakah Anda yakin ingin menghapus berita ini?"
            onConfirm={() => handleDelete(record.id_wisata)}
            okText="Ya"
            cancelText="Tidak"
            icon={<DeleteOutlined/>}
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidenav />
      <div className="main-content flex-1 p-6 ml-64">
        <Button
          type="primary"
          onClick={() => showModal("create")}
          style={{ marginBottom: "16px" }}
        >
          Create Data Wisata
        </Button>

        <div className="items mb-6">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={items} columns={columns} rowKey="id_wisata" />
          )}
        </div>

        <Modal
          title={isEditing ? "Edit Data Wisata" : "Create Data Wisata"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={isEditing ? handleUpdate : handleCreate}
          >
            <Form.Item
              label="Nama Wisata"
              name="nama_wisata"
              rules={[{ required: true, message: "Nama wisata wajib diisi" }]}
            >
              <Input placeholder="Masukkan nama wisata" />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="deskripsi"
              rules={[{ required: true, message: "Deskripsi wajib diisi" }]}
            >
              <Input.TextArea placeholder="Masukkan deskripsi wisata" />
            </Form.Item>
            <Form.Item
              label="Gambar"
              name="gambar"
              rules={[{ required: true, message: "URL gambar wajib diisi" }]}
            >
              <Input placeholder="Masukkan URL gambar" />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating_wisata"
              rules={[{ required: true, message: "Rating wajib diisi" }]}
            >
              <Input type="number" placeholder="Masukkan rating" min={1} max={5} />
            </Form.Item>
            <Form.Item
              label="Video URL"
              name="video"
              rules={[{ required: true, message: "URL video wajib diisi" }]}
            >
              <Input placeholder="Masukkan URL video" />
            </Form.Item>
            <Form.Item
              label="Paket"
              name="id_paket"
              rules={[{ required: true, message: "Paket wajib dipilih" }]}
            >
              <Select placeholder="Pilih Paket">
                {paketOptions.map((paket) => (
                  <Option key={paket.id_paket} value={paket.id_paket}>
                    {paket.nama_paket}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default WisataCRUD;
