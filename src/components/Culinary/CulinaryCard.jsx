import React, { useState } from "react";
import { Card, Modal } from "antd";

const { Meta } = Card;

const CulinaryCard = ({ image, date, title, description, author }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
          <p className="line-clamp-1">By {author}</p>
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
      </Card>

      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover mb-4"
          />
          <p>{description}</p>
          <p className="text-sm text-gray-500 mt-4">
            By {author} - {date}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CulinaryCard;
