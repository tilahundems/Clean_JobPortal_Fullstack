// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { message } from "antd";
// import AppRoutes from "./app/routes";
// import { AppProviders } from "./app/store";
// import { AuthProvider } from "./app/AuthContext";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// const RootWrapper: React.FC = () => {
//   const [msgApi, contextHolder] = message.useMessage();

//   return (
//     <QueryClientProvider client={queryClient}>
//       {contextHolder} {/* This renders the AntD messages */}
//       <AuthProvider>
//         <AppProviders>
//           <BrowserRouter>
//             <AppRoutes />
//           </BrowserRouter>
//         </AppProviders>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// };

// const root = createRoot(document.getElementById("root")!);
// root.render(<RootWrapper />);

// // Export the message API so you can use it elsewhere
// export { RootWrapper as AppRoot }; 
 


import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes.tsx";
import './index.css';
import { AppProviders } from "./app/store.ts";
import { AuthProvider } from "./app/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message } from "antd";

// Initialize Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create a wrapper component to use hooks
const Root: React.FC = () => {
  const [msgApi, contextHolder] = message.useMessage();

  // Export msgApi to use in api.ts
  React.useEffect(() => {
    (window as any).msgApi = msgApi;
  }, [msgApi]);

  return (
    <QueryClientProvider client={queryClient}>
      {contextHolder} {/* Needed for messages to render */}
      <AuthProvider>
        <AppProviders>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProviders>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);
