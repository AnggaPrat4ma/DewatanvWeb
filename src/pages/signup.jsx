import React, { useState } from "react";
import { Form, Input, Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama_user", values.nama_user);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      // Validasi dan tambahkan file gambar
      if (values.image && values.image.file) {
        formData.append("images", values.image.file);
      } else {
        notification.error({
          message: "Validasi Gagal",
          description: "Silakan unggah foto profil Anda!",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: "Registrasi Berhasil",
          description: "Akun Anda berhasil dibuat! Silakan masuk ke halaman login.",
        });
        window.location.href = "/login"; // Redirect ke halaman login setelah berhasil registrasi
      } else {
        notification.error({
          message: "Registrasi Gagal",
          description: result.msg || "Terjadi kesalahan saat mencoba registrasi.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Kesalahan Server",
        description: "Tidak dapat menghubungi server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506748686215-8b82c3b2e79a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY3J8MXx8ZGVzdGluYXRpb258ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 shadow-xl rounded-xl backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Buat Akun Baru
        </h2>
        <Form name="signup" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            label="Nama"
            name="nama_user"
            rules={[
              { required: true, message: "Silakan masukkan nama Anda!" },
            ]}
          >
            <Input placeholder="Masukkan nama Anda" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Silakan masukkan email yang valid!" },
              { required: true, message: "Silakan masukkan email Anda!" },
            ]}
          >
            <Input placeholder="Masukkan email Anda" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Silakan masukkan password Anda!" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Masukkan password Anda" />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Silakan konfirmasi password Anda!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Password dan konfirmasi password tidak cocok!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Konfirmasi password Anda" />
          </Form.Item>

          <Form.Item
            label="Foto Profil"
            name="image"
            rules={[
              { required: true, message: "Silakan upload foto profil Anda!" },
            ]}
          >
            <Upload
              accept=".png,.jpg,.jpeg,.gif"
              maxCount={1}
              beforeUpload={() => false} // Jangan unggah secara otomatis
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Foto</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 transition-all duration-300 text-white text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105"
            >
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
