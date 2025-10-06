import  { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppSidebar from "../layout/AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const { Content } = Layout;




export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

      // const [messageApi, contextHolder] = message.useMessage();

  return (
   
    <Layout  style={{ minHeight: "100vh", margin:"20px" }} className="font-serif"  >
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
