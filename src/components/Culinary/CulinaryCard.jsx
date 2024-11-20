import React, { useState } from "react";
import { Card, Modal, Rate, Button, Carousel } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const { Meta } = Card;

const CulinaryCard = ({ image, date, title, description, author, gallery }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    JSON.parse(localStorage.getItem(title)) || false
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    localStorage.setItem(title, JSON.stringify(!isFavorited));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        cover={
          <div className="relative h-[250px] overflow-hidden">
            <img
              alt={title}
              src={image}
              className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
            />
          </div>
        }
        className="dark:bg-gray-800 dark:text-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
        onClick={showModal}
      >
        <div className="flex justify-between text-sm text-slate-600 dark:text-gray-300 pb-2">
          <p>{date}</p>
          <p>By {author}</p>
        </div>
        <Meta
          title={
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          }
          description={
            <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
              {description}
            </p>
          }
        />
        <div className="mt-2 flex justify-between items-center">
          <Rate allowHalf defaultValue={4} className="text-sm" />
          <Button
            shape="circle"
            icon={
              isFavorited ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={handleFavorite}
          />
        </div>
      </Card>

      <Modal
        title={title}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Carousel autoplay>
          {gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} ${idx}`}
              className="w-full h-60 object-cover"
            />
          ))}
        </Carousel>
        <p className="mt-4">{description}</p>
        <p className="text-sm text-gray-500 mt-4">
          By {author} - {date}
        </p>
      </Modal>
    </>
  );
};

export default CulinaryCard;
