import React from "react";
import { Card, Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Register() {
  const onFinish = (values: any) => {
    console.log("Register values:", values);
    // Call backend register API here
  };

  return (


    <div className="flex items-center justify-center bg-gray-50 p-4">

<Card className="w-full max-w-md shadow-lg "  style={{ animation: "fadeInUp 900ms forwards" }}>
          <style>
            {`
              @keyframes fadeInUp {
                            from {
                              opacity: 0;
                              transform: translateY(20px);
                            }
                            to {
                              opacity: 1;
                              transform: translateY(0);
                            }
                          }
            `}
          </style>
    <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

    <Form name="register" onFinish={onFinish} layout="vertical">
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
              return Promise.reject(
                new Error("Passwords do not match!")
              );
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
        >
          Register
        </Button>
      </Form.Item>

      <p className="text-center text-gray-500">
        Already have an account?
        <Link to="/Login">
          <Button type="link"> Login</Button>
        </Link>
      </p>
    </Form>
  </Card>
</div>
  );
}
