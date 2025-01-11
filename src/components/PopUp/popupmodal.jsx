import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const AccountPopup = ({ visible, onClose }) => {
  const navigate = useNavigate();

  // Fungsi navigasi
  const handleSignIn = () => {
    onClose(); // Menutup modal
    navigate("/signin"); // Navigasi ke halaman login
  };

  const handleSignUp = () => {
    onClose(); // Menutup modal
    navigate("/signup"); // Navigasi ke halaman registrasi
  };

  return (
    <Modal
      title="Pilih Opsi"
      open={visible} // Ganti `visible` dengan `open`
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="text-center">
        <p>Silakan pilih untuk Sign In atau Sign Up:</p>
        <div className="flex justify-center gap-4">
          {/* Tombol Sign In */}
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 text-white px-6 py-3 rounded-lg"
          >
            Sign In
          </button>
          {/* Tombol Sign Up */}
          <button
            onClick={handleSignUp}
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 text-white px-6 py-3 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button Akun */}
      <button
        onClick={showModal}
        className="bg-gradient-to-r from-primary to-secondary hover:bg-primary transition-all duration-300 text-white px-3 py-1 rounded-full"
      >
        Akun
      </button>

      {/* Modal Pop-Up */}
      <AccountPopup visible={isModalVisible} onClose={handleCancel} />
    </div>
  );
};

export default Navbar;
