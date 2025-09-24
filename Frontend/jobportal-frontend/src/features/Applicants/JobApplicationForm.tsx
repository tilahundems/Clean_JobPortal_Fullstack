import React from "react";
import { Form, Input, Button, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const JobApplicationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values:[]) => {
    console.log("Job Application Submitted:", values);
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Apply </h2>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          
          <Form.Item name="coverLetter" label="Cover Letter">
            <Input.TextArea rows={3} />
          </Form.Item>
         
          <div className="flex justify-center">
            <Button type="primary" htmlType="submit" className="px-6">
              Submit Application
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
