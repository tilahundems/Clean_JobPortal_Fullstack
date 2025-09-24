import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppSidebar from "../layout/AppSidebar";
import AppHeader from "./AppHeader";
 import bkg from '../../assets/bkg.gif';

const { Content } = Layout;




export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

  return (
   
    <Layout    style={{ minHeight: "100vh" ,  backgroundImage: `url(${bkg})`, backgroundSize: 'cover' }}>
      <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <AppHeader onToggle={() => setCollapsed(!collapsed)} />
        <Content className="p-4 ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    
  );
}
