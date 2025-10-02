


import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../features/Auth/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      message.success( data.message || "Registration successful!");
      // Optionally store token
      // localStorage.setItem("token", data.token);
      navigate("/login");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Registration failed");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center  p-4 ">
      <Card
        className="w-full max-w-md shadow-lg"
        style={{ animation: "fadeInUp 900ms" }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <p className="text-center text-gray-500 mb-4">
          Create a new account
        </p>

        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
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

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 text-base font-medium bg-[rgb(65,176,232)]"
              loading={mutation.status === "pending"}
            >
              Register
            </Button>
          </Form.Item>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login">
              <Button type="link">Login</Button>
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}
