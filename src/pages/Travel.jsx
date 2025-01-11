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

const TravelCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/travel/read");
      const data = await response.json();
      setItems(
        data.datas.map((item) => ({
          ...item,
          image: `http://localhost:5000/static/show_image/${item.gambar}`,
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

  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("nama_paket", values.nama_paket);
    formData.append("deskripsi_pkt", values.deskripsi_pkt);
    formData.append("rating_paket", values.rating_paket);

    if (values.image && values.image.length > 0) {
      formData.append("gambar", values.image[0].originFileObj);
    }

    try {
      const url = editingItem
        ? `http://localhost:5000/api/travel/update/${editingItem.id_paket}`
        : "http://localhost:5000/api/travel/create";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        message.success(editingItem ? "Paket berhasil diperbarui!" : "Paket berhasil ditambahkan!");
        form.resetFields();
        setIsModalVisible(false);
        setEditingItem(null);
        fetchItems();
      } else {
        message.error(result.err_message || "Gagal menyimpan paket");
      }
    } catch (error) {
      message.error("Gagal menyimpan paket");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/travel/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Paket berhasil dihapus!");
        fetchItems();
      } else {
        message.error("Gagal menghapus paket");
      }
    } catch (error) {
      message.error("Gagal menghapus paket");
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      nama_paket: record.nama_paket,
      deskripsi_pkt: record.deskripsi_pkt,
      rating_paket: record.rating_paket,
      image: [], // Gambar tidak dapat diisi kembali
    });
  };

  const columns = [
    {
      title: "Gambar",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Gambar Paket"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Nama Paket",
      dataIndex: "nama_paket",
      key: "nama_paket",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi_pkt",
      key: "deskripsi_pkt",
    },
    {
      title: "Rating",
      dataIndex: "rating_paket",
      key: "rating_paket",
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
            title="Apakah Anda yakin ingin menghapus paket ini?"
            onConfirm={() => handleDelete(record.id_paket)}
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
          onClick={() => {
            setIsModalVisible(true);
            setEditingItem(null);
            form.resetFields();
          }}
          style={{ marginBottom: "16px" }}
        >
          Tambah Paket
        </Button>

        <div className="items mb-6">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={items} columns={columns} rowKey="id_paket" />
          )}
        </div>

        <Modal
          title={editingItem ? "Edit Paket" : "Tambah Paket"}
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
            onFinish={handleCreateOrUpdate}
          >
            <Form.Item
              label="Nama Paket"
              name="nama_paket"
              rules={[{ required: true, message: "Nama Paket wajib diisi" }]}
            >
              <Input placeholder="Masukkan nama paket" />
            </Form.Item>
            <Form.Item
              label="Deskripsi"
              name="deskripsi_pkt"
              rules={[{ required: true, message: "Deskripsi wajib diisi" }]}
            >
              <Input.TextArea placeholder="Masukkan deskripsi paket" />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating_paket"
              rules={[{ required: true, message: "Rating wajib diisi" }]}
            >
              <Input placeholder="Masukkan rating paket" type="number" />
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
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingItem ? "Perbarui" : "Tambah"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TravelCRUD;
