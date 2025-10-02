import React from "react";
import  { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};