// src/features/applicants/Applications.tsx
import React from "react";
import { Table, Tag } from "antd";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  status: "Pending" | "Accepted" | "Rejected";
  appliedDate: string;
}

const demoApplications: Application[] = [
  { id: 1, jobTitle: "Frontend Developer", company: "TechCorp", status: "Pending", appliedDate: "2025-09-10" },
  { id: 2, jobTitle: "Backend Developer", company: "CodeWorks", status: "Accepted", appliedDate: "2025-09-12" },
];

const Applications: React.FC = () => {
  const columns = [
    { title: "Job Title", dataIndex: "jobTitle", key: "jobTitle" },
    { title: "Company", dataIndex: "company", key: "company" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Accepted" ? "green" : status === "Rejected" ? "red" : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Applied Date", dataIndex: "appliedDate", key: "appliedDate" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <Table rowKey="id" columns={columns} dataSource={demoApplications} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Applications;
