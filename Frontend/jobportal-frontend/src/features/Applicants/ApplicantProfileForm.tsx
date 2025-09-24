

import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";

const { Option } = Select;

const ApplicantProfileForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Profile Data:", values);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dob">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Education Level" name="education">
            <Select placeholder="Select education level">
              <Option value="bachelor">Bachelor’s</Option>
              <Option value="master">Master’s</Option>
              <Option value="phd">PhD</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="md:col-span-2 flex justify-center">
            <Button type="primary" htmlType="submit" className="px-6">
              Save Changes
            </Button>
          </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplicantProfileForm;
