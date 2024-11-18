import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  notification,
  Drawer,
  Form,
  Input,
  Space,
  Tooltip,
  FloatButton,
  Typography,
  Skeleton,
} from "antd";
import { DeleteOutlined, InfoCircleOutlined, LinkOutlined, PictureOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;

const BlogCard = ({
  play_name,
  play_description,
  play_thumbnail,
  onClick,
  onDelete,
  onEdit,
}) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={play_name}
          src={play_thumbnail}
          style={{
            width: "100%", // Sesuaikan agar gambar mengikuti lebar card
            height: "200px", // Tentukan tinggi gambar
            objectFit: "cover", // Agar gambar tidak terdistorsi
          }}
        />
      }
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Paragraph
            strong
            ellipsis={{
              rows: 1,
              tooltip: play_name,
            }}
            style={{ marginBottom: "4px" }}
          >
            {play_name}
          </Paragraph>
          <Paragraph
            ellipsis={{
              rows: 2,
              tooltip: play_description,
            }}
            style={{ color: "rgba(0, 0, 0, 0.45)" }}
          >
            {play_description}
          </Paragraph>
        </div>
        <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
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
      const response = await fetch(
        "https://webfmsi.singapoly.com/api/playlist/8"
      );
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

  const extractYouTubeID = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/i);
    return match ? match[1] : null;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    const idVideo = extractYouTubeID(url);
    if (idVideo) {
      const thumbnailUrl = `https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;
      form.setFieldsValue({ play_thumbnail: thumbnailUrl });
    }
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
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">Our Latest Destination</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id_play}
              {...blog}
              onClick={() => handleShowDetails(blog)}
              onDelete={() => handleDelete(blog.id_play)}
              onEdit={() => handleDrawerOpen(blog)}
            />
          ))}
        </div>
      </section>

      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        tooltip="Add Blog"
        onClick={() => handleDrawerOpen()}
      />

      <Drawer
        title={
          <Title level={4} style={{ color: "#1890ff", margin: 0 }}>
            {editingBlog ? "Edit Blog" : "Add New Blog"}
          </Title>
        }
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
        bodyStyle={{ padding: 24, background: "#f5f5f5" }}
      >
        <Form layout="vertical" form={form}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item
              label={
                <span>
                  Blog Name&nbsp;
                  <Tooltip title="Enter the name of the blog">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="play_name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input placeholder="Enter the blog name" prefix={<EditOutlined />} />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Description&nbsp;
                  <Tooltip title="Provide a short description of the blog">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="play_description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <Input.TextArea rows={3} placeholder="Describe your blog in a few sentences" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Genre&nbsp;
                  <Tooltip title="What genre does this blog belong to?">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="play_genre"
              rules={[{ required: true, message: "Please enter a genre" }]}
            >
              <Input placeholder="e.g., Education, Entertainment" />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  URL&nbsp;
                  <Tooltip title="Provide a valid YouTube URL">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="play_url"
              rules={[{ required: true, message: "Please enter a URL" }]}
            >
              <Input
                placeholder="e.g., https://youtu.be/example"
                prefix={<LinkOutlined />}
                onChange={handleUrlChange}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Thumbnail URL&nbsp;
                  <Tooltip title="This field will be auto-filled based on the YouTube URL">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="play_thumbnail"
              rules={[{ required: true, message: "Please enter a thumbnail URL" }]}
            >
              <Input disabled prefix={<PictureOutlined />} />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>

      <Modal
        title={selectedBlog?.play_name}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedBlog ? (
          <>
            <div style={{ marginBottom: "16px", textAlign: "center" }}>
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${extractYouTubeID(
                  selectedBlog.play_url
                )}`}
                title={selectedBlog.play_name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Title level={4}>Genre:</Title>
            <Paragraph>{selectedBlog.play_genre}</Paragraph>
            <Title level={4}>YouTube URL:</Title>
            <a href={selectedBlog.play_url} target="_blank" rel="noopener noreferrer">
              Watch on Youtube
            </a>
            <Title level={4}>Description:</Title>
            <Paragraph>{selectedBlog.play_description}</Paragraph>
          </>
        ) : (
          <Skeleton active />
        )}
      </Modal>
    </div>
  );
};

export default BlogsComp;
