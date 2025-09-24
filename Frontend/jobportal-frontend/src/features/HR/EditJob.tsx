import React from "react";
import { Form, Input, Select, DatePicker, Button, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const EditJob: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const job = {
    id: 1,
    title: "Frontend Developer",
    company: "Abay Tech",
    location: "Addis Ababa",
    type: "Full-Time",
    deadline: "2025-09-30",
    description: "Edit job description here...",
  };

  const onFinish = (values: any) => {
    console.log("Updated job:", values);
    message.success("Job updated successfully!");
    navigate("/ManageJobs");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Edit Job</h1>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...job,
            deadline: dayjs(job.deadline),
          }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: "Please input job title" }]}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true, message: "Please input company name" }]}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please input location" }]}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Job Type"
                name="type"
                rules={[{ required: true, message: "Please select job type" }]}
              >
                <Select size="middle" placeholder="Select type">
                  <Option value="Full-Time">Full-Time</Option>
                  <Option value="Part-Time">Part-Time</Option>
                  <Option value="Internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Deadline"
                name="deadline"
                rules={[{ required: true, message: "Please select deadline" }]}
              >
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  size="middle"
                  disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full md:w-auto">
              Update Job
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditJob;

