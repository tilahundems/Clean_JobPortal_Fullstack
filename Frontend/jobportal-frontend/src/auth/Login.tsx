import React from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../features/Auth/auth.service";
import { useAuth } from "../app/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
    const { setUser } = useAuth();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      

       const user=data.res;
    // localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("role", user.role || "");

    setUser({ id: user.id, role: user.role, email: user.email });
    messageApi.success(data.message || "Login successful");
   
      setTimeout(() => {
        if (user.role === "Applicant") {
          navigate("/ApplicanDashboard");
          return;
        }
        else if (user.role === "HR") {
          navigate("/AdminDashboard");
          return;
        }
       navigate("/jobs");
      }, 1000);
    },
    onError: (error: any) => {
      messageApi.error(error.response.statusText || "Login failed");
      console.log(error.response.statusText || "Login failed");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md shadow-lg" style={{ animation: "fadeInUp 900ms" }}>
      

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <h2 className="text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500">
          Please login to your account
        </p>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              type="email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 text-base font-medium bg-[rgb(65,176,232)]"
              loading={mutation.isPending}
            >
              Log in
            </Button>
          </Form.Item>

          <p className="text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register">
              <Button type="link">Register</Button>
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}
