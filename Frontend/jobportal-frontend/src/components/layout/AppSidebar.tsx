import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  DashboardOutlined,
  SolutionOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
interface Props {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
}

export default function AppSidebar({ collapsed, onCollapse }: Props) {
  const navigate = useNavigate();
  const loc = useLocation();

  return (
      <Sider 
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth={80}
       trigger={null}   
      
    
    >

      {/* Logo */}
      <div className="text-white text-xl p-4 text-center">
        {collapsed ? "JP" : "JobPortal"}
      </div>

      {/* Menu */}
    <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[loc.pathname]} > 

         
        <Menu.Item
          key="/home"
          icon={<HomeOutlined />}
          onClick={() => navigate("/home")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="/jobs"
          icon={<ProfileOutlined />}
          onClick={() => navigate("/jobs")}
        >
          Jobs
        </Menu.Item>
       
        
        <Menu.Item
          key="/login"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/login")}
        >
          Login
        </Menu.Item>
        <Menu.Item
          key="/register"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/register")}
        >
          Register
        </Menu.Item>


        {/* Hr Section */}
          <Menu.Item
          key="/"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Menu.Item>
        
        <Menu.Item
          key="/create"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/create")}
        >
       Create Job
        </Menu.Item> 
        
          <Menu.Item
          key="/applications"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/applications")}
        >
          Applications
        </Menu.Item> 
        
        
        
         <Menu.Item
          key="/ManageJobs"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/ManageJobs")}
        >
        ManageJobs
        </Menu.Item>






        {/* Applicant Section */}
      <Menu.Item
          key="/apply"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/apply")}
        >
        Apply
        </Menu.Item>   
        
        <Menu.Item
          key="/profile"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/profile")}
        >
        Profile
        </Menu.Item> 
        
        <Menu.Item
          key="/profile/reseume"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/profile/reseume")}
        >
        upload  Resume
        </Menu.Item> 
        
        <Menu.Item
          key="/dashboard"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/dashboard")}
        >
        Dashboard
        </Menu.Item>
         <Menu.Item
          key="/apps"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/apps")}
        >
        Applications
        </Menu.Item>
        
        
         <Menu.Item
          key="/createProfile"
          icon={<SolutionOutlined />}
          onClick={() => navigate("/createProfile")}
        >
        Create Profile
        </Menu.Item>
    
      </Menu>
    </Sider>
  );
}
