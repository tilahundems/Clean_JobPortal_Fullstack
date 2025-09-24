import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
      <p className="mb-6 max-w-xl">
        Find your dream job or hire top talent. Simple, fast, and effective.
      </p>
      <div className="space-x-4">
        <Button type="primary" size="large" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button size="large" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
}
