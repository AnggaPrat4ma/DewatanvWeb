import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  message,
  Spin,
  Tooltip,
  Popconfirm,
  Tag,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Sidenav from "../components/Sidebar/sidenav";

const FormOrders = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/form/read");
      const data = await response.json();
      setItems(
        data.datas.map((item) => (item.gambar ? { ...item, gambar: `http://localhost:5000/static/show_image/${item.gambar}` } : item))
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

  const handleUpdateStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append("status", status);

      const response = await fetch(`http://localhost:5000/api/form/update/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        message.success(`Order ${status} successfully!`);
        setItems((prevItems) =>
          prevItems.map((item) => (item.id_order === id ? { ...item, status } : item))
        );
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Failed to update order status");
      }
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const renderStatus = (status) => {
    if (status === "Accepted") {
      return <Tag color="green">Accepted</Tag>;
    } else if (status === "Rejected") {
      return <Tag color="red">Rejected</Tag>;
    } else {
      return <Tag color="blue">Pending</Tag>;
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
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
      title: "User ID",
      dataIndex: "id_user",
      key: "id_user",
    },
    {
      title: "Package",
      dataIndex: "id_paket",
      key: "id_paket",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      key: "jumlah",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Gambar",
      dataIndex: "gambar",
      key: "gambar",
      render: (text) => (
        <img
          src={text}
          alt="Gambar"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title="Terima pesanan ini?"
            onConfirm={() => handleUpdateStatus(record.id_order, "Accepted")}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="primary" icon={<CheckOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Tolak pesanan ini?"
            onConfirm={() => handleUpdateStatus(record.id_order, "Rejected")}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="danger" icon={<CloseOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidenav />
      <div className="main-content flex-1 p-6 ml-64">
        <div className="items mb-6">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={items} columns={columns} rowKey="id_order" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormOrders;
