// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold text-indigo-600">Dashboards</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
          🔔
        </button>
        <div className="rounded-full bg-indigo-500 w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform duration-200">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
