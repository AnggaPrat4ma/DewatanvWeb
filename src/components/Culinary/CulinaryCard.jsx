import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";


const { Meta } = Card;

const CulinaryCard = ({ image, date, title, description, author }) => {
  return (
    <Link
      to={`/blogs/${title}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      state={{ image, date, title, description, author }}
    >
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
      >
        <div className="flex justify-between text-sm text-slate-600 dark:text-gray-300 pb-2">
          <p>{date}</p>
          <p className="line-clamp-1">By {author}</p>
        </div>
        
        <Meta
          title={<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>}
          description={<p className="line-clamp-3 text-gray-700 dark:text-gray-300">{description}</p>}
        />
      </Card>
    </Link>
  );
};

export default CulinaryCard;
