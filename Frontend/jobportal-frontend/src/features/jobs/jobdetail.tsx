import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Tag } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const jobData = {
  id: "1",
  title: "Frontend Developer",
  location: "Addis Ababa",
  type: "Full-Time",
  company: "Abay Tech",
  deadline: "2025-09-30T23:59:59",
  description:
    "We are looking for a passionate frontend developer to join our team. Responsibilities include building responsive UIs using React, TypeScript, and Tailwind. Experience with Ant Design is a plus!",
  postedDate: "2025-09-20",
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobData; // mock for now

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <Card
       style={{ animation: "fadeInUp 900ms " }}
        title={
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="font-semibold text-lg">{job.title}</span>
            <Tag color="blue">{job.type}</Tag>
          </div>   }
        className="w-full max-w-3xl shadow-lg"
        
      >
        {/* Info row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-x-6 text-gray-500 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <UserOutlined /> {job.company}
          </span>
          <span className="flex items-center gap-1">
            <EnvironmentOutlined /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <CalendarOutlined />{" "}
            {new Date(job.deadline).toLocaleDateString()}
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-gray-700 leading-relaxed">{job.description}</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate("/jobs")}
            className="w-full sm:w-1/2 text-base"
          >
            Back to Jobs
          </Button>
          <Button
            className="w-full sm:w-1/2  text-base  bg-[rgb(65,176,232)]"
          >
            Apply Now
          </Button>
        </div>
      </Card>
    </div>
  );
}
