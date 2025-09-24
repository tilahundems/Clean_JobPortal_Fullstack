import React from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Login() {
  const onFinish = (values: any) => {
    console.log("Login values:", values);
    // Call backend login API here
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg"  style={{ animation: "fadeInUp 900ms " }}
      >
         
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

             <h2 className="text-center mb-2">Welcome Back</h2>
          <p className="text-center text-muted ">Please login to your account</p>

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
            >
              Log in
            </Button>
          </Form.Item>

          <p className="text-center text-gray-500">
            Don’t have an account?
                        <Link to="/Register" > <Button type="link"> Register</Button></Link>
           
          </p>
        </Form>
      </Card>
    </div>
  );
}
