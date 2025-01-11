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

const JenisCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/jenis/read");
      const data = await response.json();
      setItems(data.datas);
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
    const fasilitasArray = values.fasilitas.split('\n').map(item => item.trim()).filter(item => item !== '');
    const formData = new FormData();
    formData.append("nama_jenis", values.nama_jenis);
    formData.append("fasilitas", fasilitasArray.join(', '));
    formData.append("price", values.price);

    try {
      const response = await fetch("http://localhost:5000/api/jenis/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        message.success("Data jenis berhasil ditambahkan!");
        form.resetFields();
        setIsModalVisible(false);
        fetchItems();
      } else {
        message.error(result.err_message || "Gagal menambahkan data jenis");
      }
    } catch (error) {
      message.error("Gagal menambahkan data jenis");
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      nama_jenis: record.nama_jenis,
      fasilitas: record.fasilitas,
      price: record.price,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("nama_jenis", values.nama_jenis);
    formData.append("fasilitas", values.fasilitas);
    formData.append("price", values.price);

    try {
      const response = await fetch(
        `http://localhost:5000/api/jenis/update/${editingItem.id_jenis}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        message.success("Data jenis berhasil diperbarui!");
        form.resetFields();
        setIsModalVisible(false);
        setEditingItem(null);
        fetchItems();
      } else {
        message.error(result.err_message || "Gagal memperbarui data jenis");
      }
    } catch (error) {
      message.error("Gagal memperbarui data jenis");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jenis/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Data jenis berhasil dihapus!");
        fetchItems();
      } else {
        message.error("Gagal menghapus data jenis");
      }
    } catch (error) {
      message.error("Gagal menghapus data jenis");
    }
  };

  const columns = [
    {
      title: "Nama Jenis",
      dataIndex: "nama_jenis",
      key: "nama_jenis",
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
      title: "Fasilitas",
      dataIndex: "fasilitas",
      key: "fasilitas",
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
      title: "Harga",
      dataIndex: "price",
      key: "price",
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
            title="Apakah Anda yakin ingin menghapus jenis ini?"
            onConfirm={() => handleDelete(record.id_jenis)}
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
          {editingItem ? "Edit Data Jenis" : "Create Data Jenis"}
        </Button>

        <div className="items mb-6">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={items} columns={columns} rowKey="id_jenis" />
          )}
        </div>

        <Modal
          title={editingItem ? "Edit Data Jenis" : "Create Data Jenis"}
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
              label="Nama Jenis"
              name="nama_jenis"
              rules={[{ required: true, message: "Nama Jenis wajib diisi" }]}
            >
              <Input placeholder="Masukkan nama jenis" />
            </Form.Item>
            <Form.Item
              label="Fasilitas"
              name="fasilitas"
              rules={[{ required: true, message: "Fasilitas wajib diisi" }]}
            >
              <Input.TextArea
                placeholder="Masukkan fasilitas"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="Harga"
              name="price"
              rules={[{ required: true, message: "Harga wajib diisi" }]}
            >
              <Input placeholder="Masukkan harga" type="number" />
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

export default JenisCRUD;
