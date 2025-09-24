import React from "react";
import { Card, Button, Row, Col, Tag } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  location: string;
  type: string;
  company: string;
  deadline: string;
  description: string;
};

const demoJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Addis Ababa",
    type: "Full-Time",
    company: "Abay Tech",
    deadline: "2025-09-30T23:59:59",
    description:
      "We are looking for a talented frontend developer with React experience...",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Addis Ababa",
    type: "Full-Time",
    company: "Abay Tech",
    deadline: "2025-10-05T23:59:59",
    description: "Looking for a skilled .NET developer for API development...",
  },
];

export default function JobList() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      <Row gutter={[16, 16]}>
        {demoJobs.map((job) => (
          <Col key={job.id} xs={24} sm={12} md={8}>
            <Card
             style={{ animation: "fadeInUp 900ms " }}
              title={
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{job.title}</span>
                  <Tag color="blue">{job.type}</Tag>
                </div>
              }
              bordered={true}
              className="shadow-md hover:shadow-xl transition-all"
            >
              {/* Description (truncated, styled) */}
              <p className="mb-4 text-gray-600 line-clamp-3">{job.description}</p>

              {/* Footer info row */}
              <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <CalendarOutlined />{" "}
                  {new Date(job.deadline).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <UserOutlined /> {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <EnvironmentOutlined /> {job.location}
                </span>
              </div>

              {/* View details button */}
              <Button
              className="bg-[rgb(65,176,232)]"
                onClick={() => navigate(`/jobs/${job.id}`)}
                block
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

