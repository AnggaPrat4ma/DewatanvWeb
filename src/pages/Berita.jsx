import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  Table,
  message,
  Spin,
  Tooltip,
  Form,
  Upload,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import Sidenav from "../components/Sidebar/sidenav";

const BeritaCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/berita/read");
      const data = await response.json();
      setItems(
        data.datas.map((item) => ({
          ...item,
          image: `http://localhost:5000/static/show_image/${item.image}`,
        }))
      );
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (values) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("deskripsi", values.deskripsi);
    formData.append("source", values.source);

    if (!values.image || values.image.length === 0) {
      message.error("Gambar wajib diunggah");
      return;
    }
    formData.append("image", values.image[0].originFileObj); // Kirim file asli

    try {
      const response = await fetch("http://localhost:5000/api/berita/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        message.success("Data berita berhasil ditambahkan!");
        form.resetFields();
        setIsModalVisible(false);
        fetchItems();
      } else {
        message.error(result.err_message || "Gagal menambahkan data berita");
      }
    } catch (error) {
      message.error("Gagal menambahkan data berita");
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      judul: record.judul,
      deskripsi: record.deskripsi,
      source: record.source,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("deskripsi", values.deskripsi);
    formData.append("source", values.source);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].originFileObj);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/berita/update/${editingItem.id_berita}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        message.success("Data berita berhasil diperbarui!");
        form.resetFields();
        setIsModalVisible(false);
        setEditingItem(null);
        fetchItems();
      } else {
        message.error(result.err_message || "Gagal memperbarui data berita");
      }
    } catch (error) {
      message.error("Gagal memperbarui data berita");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/berita/delete/${id}`, {
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

  const columns = [
    {
      title: "Gambar",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Gambar Berita"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
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
      title: "Source URL",
      dataIndex: "source",
      key: "source",
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
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus berita ini?"
            onConfirm={() => handleDelete(record.id_berita)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
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
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: "16px" }}
        >
          {editingItem ? "Edit Data Berita" : "Create Data Berita"}
        </Button>

        <div className="items mb-6">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={items} columns={columns} rowKey="id_berita" />
          )}
        </div>

        <Modal
          title={editingItem ? "Edit Data Berita" : "Create Data Berita"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingItem(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingItem ? handleUpdate : handleCreate}
          >
            <Form.Item
              label="Nama Berita"
              name="judul"
              rules={[{ required: true, message: "Nama Berita wajib diisi" }]}
            >
              <Input placeholder="Masukkan nama Berita" />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="deskripsi"
              rules={[{ required: true, message: "Deskripsi wajib diisi" }]}
            >
              <Input.TextArea placeholder="Masukkan deskripsi Berita" />
            </Form.Item>
            <Form.Item
              label="Gambar"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Unggah Gambar</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Source URL"
              name="source"
              rules={[{ required: true, message: "URL source wajib diisi" }]}
            >
              <Input placeholder="Masukkan URL source" />
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

export default BeritaCRUD;
