

import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  DashboardOutlined,
  UserAddOutlined,
  ProfileOutlined,
  LoginOutlined,
  LogoutOutlined,PlusOutlined,ToolOutlined,UserOutlined,
  DatabaseFilled,BoxPlotOutlined
} from "@ant-design/icons";
import { useAuth } from "../../app/AuthContext";
import sitelogo from "../../../public/imgs/sitelogo.png";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
}

export default function AppSidebar({ collapsed, onCollapse }: Props) {
  const navigate = useNavigate();
  const loc = useLocation();


const { user,logout } = useAuth();
const role = user?.role;
console.log(`Role-> ${role}`);

  // Define menu items
  const commonItems = [
    {
      key: "/",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "/jobs",
      label: "Jobs",
      icon: <ProfileOutlined />,
      onClick: () => navigate("/jobs"),
    },
    
  ];

  const auth =[
    {
      key: "/login",
      label: "Login",
      icon: <LoginOutlined />,
      onClick: () => navigate("/login"),
    },
    {
      key: "/register",
      label: "Register",
      icon: <BoxPlotOutlined />,
      onClick: () => navigate("/register"),
    },
  ]

  const hrItems = [
    {
      key: "/AdminDashboard",
      label: "Admin Dashboard",
      icon: <DashboardOutlined />,
      onClick: () => navigate("/AdminDashboard"),
    },
    {
      key: "/create",
      label: "Create Job",
      icon: <PlusOutlined />,
      onClick: () => navigate("/create"),
    },
    {
      key: "/ManageJobs",
      label: "Manage Jobs",
      icon: <ToolOutlined />,
      onClick: () => navigate("/ManageJobs"),
    },
  
  ];

  const applicantItems = [
    {
      key: "/Dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      onClick: () => navigate("/ApplicanDashboard"),
    },
    {
      key: "/profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "/createProfile",
      label: "Create || Update Profile",
      icon: <UserAddOutlined />,
      onClick: () => navigate("/createProfile"),
    },
    {
      key: "/apps",
      label: "Applications",
      icon: <DatabaseFilled />,
      onClick: () => navigate("/apps"),
    },
  ];

  const logoutItem = user
  ? [
      {
        key: "/logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        onClick: async () => {
          await logout();
          navigate("/login"); // redirect after logout
        },
      },
    ]
  : [];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth={50}
      trigger={null}
    >
      {/* Logo */}
      {/* <div className="text-white text-xl p-4 text-center">
        {collapsed ? "JP" :  (
    <img
      src={sitelogo}
      alt="Abay Bank Logo"
      style={{ maxWidth: "100%", height: "40px", objectFit: "contain" }}
    />
  )
  }
      </div> */}

      <div className="text-white text-xl p-4 text-center">
  {collapsed ? (
    "JP"
  ) : (
    <img
      src={sitelogo}
      alt="Abay Bank Logo"
      style={{ maxWidth: "100%", height: "40px", objectFit: "contain" }}
    />
  )}
</div>


      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[loc.pathname]}
        items={[
           
          ...(role === "HR" ? hrItems : []),
          ...(role != "HR" ? commonItems :[]),
          ...(role === "Applicant" ? applicantItems : []),
         ...(role ? logoutItem : auth), // show logout if logged in, otherwise login/register

          
        ]}
      />
    </Sider>
  );
}
