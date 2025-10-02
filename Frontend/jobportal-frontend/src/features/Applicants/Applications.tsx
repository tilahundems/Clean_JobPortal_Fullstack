import React from "react";
import { Table, Tag, Empty, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchMyApplications } from "./applications.service";
import { type Application } from "./applications.type";

const Applications: React.FC = () => {
  const { data: applications = [], isLoading, isError } = useQuery<Application[]>({
    queryKey: ["myApplications"],
    queryFn: fetchMyApplications,
  });

  const columns = [
    { 
      title: "Job Title", 
      dataIndex: ["job", "title"], 
      key: "jobTitle", 
      render: (title: string, record: Application) => record.job?.title || "-" 
    },
    { 
      title: "Location", 
      dataIndex: ["job", " work Location"], 
      key: "Location", 
      render: (_: any, record: Application) => record.job?.location || "-" 
    },
    { 
      title: "Applied Date", 
      dataIndex: "appliedDate", 
      key: "appliedDate",
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Accepted" ? "green" : status === "Rejected" ? "red" : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (status: string) => {
        const color = status === "Accepted" ? "green" : status === "Rejected" ? "red" : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return <Empty description="Failed to load applications" />;

  if (applications.length === 0)
    return <Empty description="No applications found" />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={applications}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Applications;
