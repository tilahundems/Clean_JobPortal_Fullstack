// CreateJob.tsx
import { useMutation } from "@tanstack/react-query";
import { createJob } from "../jobs/jobs.service";
import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { createJobPayload } from "../jobs/job.types";

const { Option } = Select;

const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [msgapi,contextholder] = message.useMessage();
  // Mutation hook
  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      msgapi.success("Job created successfully!");
      setTimeout(() => {
        navigate("/ManageJobs");
      }, 1000);

     
    },
    onError: (err: any) => {
      msgapi.error(err.response?.data?.message || "Job creation failed");
    },
  });

  const onFinish = (values: any) => {
    if (mutation.isPending) return;
    const payload: createJobPayload = {
      Title: values.title,
      Location: values.location,
      ExpiryDate: values.deadline.format("YYYY-MM-DD"),
      Description: values.description,
      PostedById: user?.id || undefined,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Create Job
        </h1>
     {contextholder}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            {/* Job Title */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: "Please input job title" }]}
              >
                <Input size="middle" placeholder="Frontend Developer" />
              </Form.Item>
            </Col>

            {/* Company */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true, message: "Please input company name" }]}
              >
                <Input size="middle" placeholder="Abay Tech" />
              </Form.Item>
            </Col>

            {/* Location */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please input location" }]}
              >
                <Input size="middle" placeholder="Addis Ababa" />
              </Form.Item>
            </Col>

            {/* Job Type */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Job Type"
                name="type"
                rules={[{ required: true, message: "Please select job type" }]}
              >
                <Select size="middle" placeholder="Select job type">
                  <Option value="Full-Time">Full-Time</Option>
                  <Option value="Part-Time">Part-Time</Option>
                  <Option value="Internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Deadline */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Application Deadline"
                name="deadline"
                rules={[{ required: true, message: "Please select deadline" }]}
              >
                <DatePicker
                  className="w-full"
                  size="middle"
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter job description" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Write job description here..."
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <div className="justify-center flex items-center"> 
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-1/2"
                  loading={mutation.status==="pending"}
                  disabled={mutation.isPending}
                >
                  Create Job
                </Button>
          </div>
              
                      
          
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateJob;
