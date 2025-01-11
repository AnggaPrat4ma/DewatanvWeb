import React from "react";
import { Card, Button, Popconfirm, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Paragraph } = Typography;

const BlogCard = ({ nama_wisata, deskripsi, gambar, onClick, onDelete, onEdit }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={nama_wisata}
          src={gambar}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover", // Adjust image aspect ratio
          }}
        />
      }
      onClick={onClick} // Trigger details view
      actions={[
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent onClick
            onEdit();
          }}
        />,
        <Popconfirm
          title="Apakah Anda yakin ingin menghapus destinasi ini?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={(e) => {
            e.stopPropagation(); // Prevent triggering parent onClick
            onDelete();
          }}
          onCancel={(e) => e.stopPropagation()}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => e.stopPropagation()} // Prevent card click
          />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={
          <Paragraph
            strong
            ellipsis={{ rows: 1, tooltip: nama_wisata }}
            style={{ marginBottom: 0 }}
          >
            {nama_wisata}
          </Paragraph>
        }
        description={
          <Paragraph
            ellipsis={{ rows: 2, tooltip: deskripsi }}
            style={{ color: "rgba(0, 0, 0, 0.65)" }}
          >
            {deskripsi}
          </Paragraph>
        }
      />
    </Card>
  );
};

export default BlogCard;
