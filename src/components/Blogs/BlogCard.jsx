import React from "react";
import { Card, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Meta } = Card;

const BlogCard = ({ play_name, play_description, play_thumbnail, onClick, onDelete, onEdit }) => {
  return (
    <Card
      hoverable
      cover={<img alt={play_name} src={play_thumbnail} />}
      actions={[
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent onClick
            onEdit();
          }}
        />,
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent onClick
            onDelete();
          }}
        />,
      ]}
      onClick={onClick} // When card is clicked, show details
    >
      <Meta
        title={play_name}
        description={
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Limit description to 2 lines
            }}
          >
            {play_description}
          </div>
        }
      />
    </Card>
  );
};

export default BlogCard;
