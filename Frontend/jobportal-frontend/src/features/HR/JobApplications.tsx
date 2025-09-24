import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FaDownload } from "react-icons/fa";

interface Application {
  id: number;
  applicantName: string;
  email: string;
  jobTitle: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  resumeUrl: string;
}

const demoApplications: Application[] = [
  {
    id: 1,
    applicantName: "Tilahun Dems",
    email: "tilahun@example.com",
    jobTitle: "Frontend Developer",
    status: "Pending",
    resumeUrl: "#",
  },
  {
    id: 2,
    applicantName: "Sara Ali",
    email: "sara@example.com",
    jobTitle: "Backend Developer",
    status: "Reviewed",
    resumeUrl: "#",
  },
];

const JobApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setApplications(demoApplications);
      setLoading(false);
    }, 500);
  }, []);

  // Handle changing status
  const handleStatusChange = (id: number, newStatus: Application["status"]) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    message.success(`Application status updated to ${newStatus}`);
  };

  // Table columns
  const columns: ColumnsType<Application> = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Accepted") color = "green";
        else if (status === "Rejected") color = "red";
        else if (status === "Reviewed") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Resume",
      dataIndex: "resumeUrl",
      key: "resume",
      render: (url) => (
        <Button
          type="link"
          icon={<FaDownload />}
          onClick={() => message.info("Download not implemented")}
        >
          Download
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleStatusChange(record.id, "Reviewed")}
          >
            Mark Reviewed
          </Button>
          <Button
            size="small"
            danger
            onClick={() => handleStatusChange(record.id, "Rejected")}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default JobApplications;
