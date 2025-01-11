import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  ReadOutlined,
  RocketOutlined
} from "@ant-design/icons";

function Sidenav({ color }) {
  // const [selectedKey, setSelectedKey] = useState("/");

  // const handleMenuKey = ({ key }) => {
  //   setSelectedKey(key);
  // };

  const location = useLocation()
  const selectedKey = location.pathname

  const menuItems = [
    {
      key: "/",
      label: (
        <NavLink to="/">
          <span
            className="icon flex items-center p-2"
            style={{
              backgroundColor: selectedKey === "/" ? "#e6f7ff" : "",
              color: selectedKey === "/" ? "#1890ff" : "",
            }}
          >
            <HomeOutlined />
            <span className="label ml-2 text-lg">Home</span>
          </span>
        </NavLink>
      ),
    },
    {
      key: "/wisataCRUD",
      label: (
        <NavLink to="/wisataCRUD">
          <span
            className="icon flex items-center p-2"
            style={{
              backgroundColor: selectedKey === "/wisataCRUD" ? "#e6f7ff" : "",
              color: selectedKey === "/wisataCRUD" ? "#1890ff" : "",
            }}
          >
            <EnvironmentOutlined />
            <span className="label ml-2 text-lg">Add Wisata</span>
          </span>
        </NavLink>
      ),
    },
    {
      key: "/beritaCRUD",
      label: (
        <NavLink to="/beritaCRUD">
          <span
            className="icon flex items-center p-2"
            style={{
              backgroundColor: selectedKey === "/beritaCRUD" ? "#e6f7ff" : "",
              color: selectedKey === "/beritaCRUD" ? "#1890ff" : "",
            }}
          >
            <ReadOutlined />
            <span className="label ml-2 text-lg">Add Berita</span>
          </span>
        </NavLink>
      ),
    },
    {
      key: "/travelCRUD",
      label: (
        <NavLink to="/travelCRUD">
          <span
            className="icon flex items-center p-2"
            style={{
              backgroundColor: selectedKey === "/travelCRUD" ? "#e6f7ff" : "",
              color: selectedKey === "/travelCRUD" ? "#1890ff" : "",
            }}
          >
            <RocketOutlined />
            <span className="label ml-2 text-lg">Add travel</span>
          </span>
        </NavLink>
      ),
    },
    {
      key: "/jenis",
      label: (
        <NavLink to="/jenis">
          <span
            className="icon flex items-center p-2"
            style={{
              backgroundColor: selectedKey === "/jenis" ? "#e6f7ff" : "",
              color: selectedKey === "/jenis" ? "#1890ff" : "",
            }}
          >
            <RocketOutlined />
            <span className="label ml-2 text-lg">Add Jenis</span>
          </span>
        </NavLink>
      ),
    },
    // {
    //   key: "/accbooking",
    //   label: (
    //     <NavLink to="/accbooking">
    //       <span
    //         className="icon flex items-center p-2"
    //         style={{
    //           backgroundColor: selectedKey === "/accbooking" ? "#e6f7ff" : "",
    //           color: selectedKey === "/accbooking" ? "#1890ff" : "",
    //         }}
    //       >
    //         <RocketOutlined />
    //         <span className="label ml-2 text-lg">Add Jenis</span>
    //       </span>
    //     </NavLink>
    //   ),
    // },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-md fixed left-0 top-0 p-4">
      <div className="brand text-center text-2xl font-semibold mb-4">
        Dewata Trails
      </div>
      <hr className="mb-4" />
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        selectedKeys={[selectedKey]}
        // onSelect={handleMenuKey}
        className="space-y-2"
      />
    </div>
  );
}

export default Sidenav;
