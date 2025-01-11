import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidebar/sidenav";

const Admin = () => {
  return (
    <>
      <Sidenav />
      <Outlet />
    </>
  );
};

export default Admin;
