import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  notification,
  FloatButton,
  Drawer,
  Form,
  Input,
  Typography
} from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Paragraph } = Typography;

const BlogCard = ({ play_name, play_description, play_thumbnail, onClick, onDelete, onEdit }) => {
  return (
    <Card
      hoverable
      cover={<img alt={play_name} src={play_thumbnail} />}
      onClick={onClick} // Show details on click
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Paragraph
            strong
            ellipsis={{
              rows: 1, // Truncate to 1 line
              tooltip: play_name, // Show full text on hover
            }}
            style={{ marginBottom: "4px" }}
          >
            {play_name}
          </Paragraph>
          <Paragraph
            ellipsis={{
              rows: 2, // Truncate to 2 lines
              tooltip: play_description, // Show full description on hover
            }}
            style={{ color: "rgba(0, 0, 0, 0.45)" }} // Default Ant Design color for description
          >
            {play_description}
          </Paragraph>
        </div>
        <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              onEdit();
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              onDelete();
            }}
          />
        </div>
      </div>
    </Card>
  );
};

const BlogsComp = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await fetch("https://webfmsi.singapoly.com/api/playlist/8");
      const data = await response.json();
      if (data.message === "OK") {
        setBlogs(data.datas);
      } else {
        notification.error({ message: "Failed to load data" });
      }
    } catch (error) {
      notification.error({ message: "Error fetching data" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowDetails = (blog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://webfmsi.singapoly.com/api/playlist/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        notification.success({ message: "Blog deleted successfully" });
        setBlogs(blogs.filter((blog) => blog.id_play !== id));
      } else {
        notification.error({ message: "Failed to delete the blog" });
      }
    } catch (error) {
      notification.error({ message: "Error deleting blog" });
    }
  };

  const handleDrawerOpen = (blog = null) => {
    setIsDrawerVisible(true);
    if (blog) {
      form.setFieldsValue(blog); // Pre-fill form for editing
      setEditingBlog(blog); // Set the blog being edited
    } else {
      form.resetFields(); // Clear form for new blog
      setEditingBlog(null);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    setEditingBlog(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      // Determine whether to create or update
      const method = editingBlog ? "POST" : "POST";
      const url = editingBlog
        ? `https://webfmsi.singapoly.com/api/playlist/update/${editingBlog.id_play}` // Update by ID
        : "https://webfmsi.singapoly.com/api/playlist/8"; // Create new
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const responseData = await response.json();
  
      if (responseData.message === "OK") {
        notification.success({
          message: `Blog ${editingBlog ? "updated" : "added"} successfully`,
        });
        handleDrawerClose();
        fetchData(); // Refresh data
      } else {
        notification.error({
          message: `Failed to ${editingBlog ? "update" : "add"} the blog`,
        });
      }
    } catch (error) {
      notification.error({ message: "Error submitting data" });
    }
  };
  

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 text-3xl font-bold">Our Latest Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id_play}
              {...blog}
              onClick={() => handleShowDetails(blog)}
              onDelete={() => handleDelete(blog.id_play)}
              onEdit={() => handleDrawerOpen(blog)} // Buka drawer dengan data blog untuk edit
            />
          ))}
        </div>
      </section>

      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        tooltip="Add Blog"
        onClick={() => handleDrawerOpen()} // Buka drawer untuk penambahan data baru
      />

      <Drawer
        title={editingBlog ? "Edit Blog" : "Add New Blog"}
        placement="right"
        onClose={handleDrawerClose}
        open={isDrawerVisible}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="play_name" rules={[{ required: true, message: "Please enter a name" }]}>
            <Input placeholder="Enter the blog name" />
          </Form.Item>
          <Form.Item label="Description" name="play_description" rules={[{ required: true, message: "Please enter a description" }]}>
            <Input.TextArea rows={3} placeholder="Enter the blog description" />
          </Form.Item>
          <Form.Item label="Genre" name="play_genre" rules={[{ required: true, message: "Please enter a genre" }]}>
            <Input placeholder="Enter the genre" />
          </Form.Item>
          <Form.Item label="URL" name="play_url" rules={[{ required: true, message: "Please enter a URL" }]}>
            <Input placeholder="Enter the blog URL" />
          </Form.Item>
          <Form.Item label="Thumbnail" name="play_thumbnail" rules={[{ required: true, message: "Please enter a thumbnail URL" }]}>
            <Input placeholder="Enter the thumbnail URL" />
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title={selectedBlog?.play_name}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </button>,
        ]}
        width={800}
      >
        <p>{selectedBlog?.play_description}</p>
      </Modal>
    </div>
  );
};

export default BlogsComp;