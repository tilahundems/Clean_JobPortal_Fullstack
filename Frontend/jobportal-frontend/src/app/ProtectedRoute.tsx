import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/AuthContext";
import { Spin } from "antd";

interface ProtectedRouteProps {
  roles?: string[]; // allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { user,loading} = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  if (!user) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role) ) {
    
    return <Navigate to="/403" replace />;
  }

  return <Outlet />; // allowed → render child routes
};

export default ProtectedRoute;
