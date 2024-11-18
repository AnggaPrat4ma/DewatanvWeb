import React, { useState, useEffect } from "react";
import { FloatButton, Drawer, Form, Input, Button, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const FloatingButtonWithDrawer = ({ fetchData, editingBlog, setEditingBlog }) => {
  console.log("setEditingBlog:", setEditingBlog);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const handleDrawerOpen = () => {
    setIsDrawerVisible(true);
    if (editingBlog) {
      form.setFieldsValue(editingBlog);
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
      const url = editingBlog
        ? `https://webfmsi.singapoly.com/api/playlist/${editingBlog.id_play}`
        : "https://webfmsi.singapoly.com/api/playlist/8";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (responseData.message === "OK") {
        notification.success({ message: `Data ${editingBlog ? "updated" : "added"} successfully` });
        handleDrawerClose();
        fetchData(); // Refresh data setelah berhasil
      } else {
        notification.error({ message: `Failed to ${editingBlog ? "update" : "add"} data` });
      }
    } catch (error) {
      notification.error({ message: "Error submitting data" });
    }
  };

  return (
    <>
      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        tooltip={editingBlog ? "Edit Blog" : "Add Blog"}
        onClick={handleDrawerOpen}
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
    </>
  );
};

export default FloatingButtonWithDrawer;
