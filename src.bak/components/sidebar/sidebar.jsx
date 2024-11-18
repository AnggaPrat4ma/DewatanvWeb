// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gradient-to-br from-blue-500 to-indigo-700 ${collapsed ? 'w-20' : 'w-64'} transition-width duration-300 text-white`}>
      <button
        className="text-white p-4 focus:outline-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '>' : '<'}
      </button>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="bg-transparent"
        defaultSelectedKeys={['dashboard']}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined className="text-lg" />}>
          <span className="hover:underline">Dashboard</span>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined className="text-lg" />}>
          <span className="hover:underline">Users</span>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined className="text-lg" />}>
          <span className="hover:underline">Settings</span>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined className="text-lg" />}>
          <span className="hover:underline">Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
