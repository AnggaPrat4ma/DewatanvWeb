import React, { useState, useContext } from "react";
import "tailwindcss/tailwind.css";
import { Card, Avatar, Button, Modal, Input } from "antd";
import { AuthContext } from "../providers/AuthProvider";

const { Meta } = Card;

const ProfileCard = () => {
  const { isLoggedIn, userProfile, logout, updateUserProfile } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nama_user: userProfile.nama_user,
    email: userProfile.email,
    role: userProfile.role,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...userProfile, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Kirim data update ke server
      await updateUserProfile(userProfile);

      // Perbarui state setelah data berhasil diperbarui
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-teal-500">
      <Card
        className="w-96 shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden bg-white"
        cover={
          <div className="relative">
            <img
              alt="Profile Cover"
              src={`http://localhost:5000/static/show_image/${userProfile.images}`}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-xl font-semibold">
            </div>
          </div>
        }
      >
        <Meta
          avatar={
            <Avatar
              src={`http://localhost:5000/static/show_image/${userProfile.images}`}
              size={80}
              className="border-4 border-blue-500 shadow-md"
            />
          }
          title={<span className="text-lg font-bold text-gray-800">{userProfile.nama_user}</span>}
          description={<span className="text-gray-600 font-medium">{userProfile.role}</span>}
        />
        <div className="mt-6">
          <p className="text-gray-700 text-sm">
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Role:</strong> {userProfile.role}
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          {/* <Button
            type="primary"
            onClick={showModal}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Edit
          </Button> */}
          <Button
            type="primary"
            danger
            onClick={logout}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Logout
          </Button>
        </div>
      </Card>

      {/* Modal for Editing User Data */}
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              name="nama_user"
              value={formData.nama_user}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <Input
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileCard;
