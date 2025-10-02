import React, { useState } from "react";
import { Layout ,message} from "antd";
import { Outlet } from "react-router-dom";
import AppSidebar from "../layout/AppSidebar";
import AppHeader from "./AppHeader";
 import bkg from '../../assets/bkg.gif';
import AppFooter from "./AppFooter";

const { Content } = Layout;




export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

      const [messageApi, contextHolder] = message.useMessage();

  return (
   
    <Layout  style={{ minHeight: "100vh", margin:"20px" }} className="font-serif"  >
     {contextHolder} 
      <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <AppHeader onToggle={() => setCollapsed(!collapsed)} />
        <Content className="p-4  bg-gray-50"   >
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
    
  );
}
