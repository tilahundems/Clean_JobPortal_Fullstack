// import  { useState } from "react";
// import { Layout } from "antd";
// import { Outlet } from "react-router-dom";
// import AppSidebar from "../layout/AppSidebar";
// import AppHeader from "./AppHeader";
// import AppFooter from "./AppFooter";

// const { Content } = Layout;




// export default function MainLayout() {
//     const [collapsed, setCollapsed] = useState(false);

//       // const [messageApi, contextHolder] = message.useMessage();

//   return (
   
//     <Layout  style={{ minHeight: "100vh", margin:"20px" }} className="font-serif"  >
//       <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
//       <Layout>
//         <AppHeader onToggle={() => setCollapsed(!collapsed)} />
//         <Content className="p-4  bg-gray-50"   >
//           <Outlet />
//         </Content>
//         <AppFooter />
//       </Layout>
//     </Layout>
    
//   );
// }

// import { useState } from "react";
// import { Layout } from "antd";
// import { Outlet } from "react-router-dom";
// import AppSidebar from "../layout/AppSidebar";
// import AppHeader from "./AppHeader";
// import AppFooter from "./AppFooter";

// const { Content } = Layout;

// export default function MainLayout() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
     
     
//      <Layout className="min-h-screen font-serif bg-gray-100 md:flex md:flex-row md:m-[20px]">
//       <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
//       <Layout
//         className="flex-1 min-h-screen transition-all duration-300"
//         style={{ overflow: "hidden" }}
//       >
//         <AppHeader onToggle={() => setCollapsed(!collapsed)} />
//         <Content className="p-3 sm:p-4 md:p-6 bg-gray-50 overflow-x-hidden">
//           <Outlet />
//         </Content>
//         <AppFooter />
//       </Layout>
//     </Layout>
//   );
// }


import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppSidebar from "../layout/AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen font-serif bg-gray-100 md:flex md:flex-row md:m-[20px]">
      {/* Sidebar */}
      <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Main layout */}
      <Layout
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ overflow: "hidden" }}
      >
        <AppHeader onToggle={() => setCollapsed(!collapsed)} />
        <Content className="p-3 sm:p-4 md:p-6 bg-gray-50 overflow-x-hidden">
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}

