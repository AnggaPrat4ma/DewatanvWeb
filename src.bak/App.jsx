// src/App.js
import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
