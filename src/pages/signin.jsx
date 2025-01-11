import React, { useState, useContext } from "react";
import { notification } from "antd";
import { AuthContext } from "../providers/AuthProvider"; // Pastikan path ini sesuai

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Pastikan AuthContext tersedia dan valid

  // Fungsi untuk mengirim data login ke server
  const sendData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
  };

  // Fungsi handle submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const userData = new FormData();
    userData.append("email", email);
    userData.append("password", password);

    try {
      const response = await sendData(
        "http://127.0.0.1:5000/api/auth/login",
        userData
      );

      if (response?.access_token) {
        login(response.access_token); // Panggil login dari AuthContext
        notification.success({
          message: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
      } else {
        setError("Login gagal. Periksa email dan password Anda.");
        notification.error({
          message: "Login Gagal",
          description: "Email atau password tidak valid.",
        });
      }
    } catch (error) {
      console.log(error);
      setError("Terjadi kesalahan saat mencoba login.");
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
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 shadow-xl rounded-xl backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Dewata Trails
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 transition-all duration-300 text-white text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
