// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const cards = [
    { title: "Visitors", value: "1,234", description: "Number of visitors today" },
    { title: "Sales", value: "$5,432", description: "Total sales this week" },
    { title: "Orders", value: "320", description: "New orders" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-600">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            <p className="text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
