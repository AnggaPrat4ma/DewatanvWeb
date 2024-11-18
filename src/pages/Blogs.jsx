import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
// import FloatingButtonWithDrawer from "../components/FloatingButton/FloatingButtonWithDrawer";

const Blogs = () => {
  return (
    <div style={{ paddingTop: "14px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <BlogsComp />
      {/* <FloatingButtonWithDrawer /> */}
    </div>
  );
};

export default Blogs;
