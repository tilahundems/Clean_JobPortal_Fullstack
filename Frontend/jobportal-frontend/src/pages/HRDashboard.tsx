import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin } from "antd";
import { UserOutlined, FileTextOutlined, ProfileOutlined, PlusCircleOutlined } from "@ant-design/icons";

const HrDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    newApplications: 0,
    activeJobs: 0,
  });

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setStats({
        totalJobs: 12,
        totalApplicants: 45,
        newApplications: 5,
        activeJobs: 10,
      });
      setLoading(false);
    }, 200);
  }, []);

  if (loading) return <Spin className="m-10" size="large" />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300" >
            <div className="flex items-center">
              <UserOutlined style={{ fontSize: 30, color: "#1890ff" }} />
              <div className="ml-4">
                <p className="text-gray-500">Total Applicants</p>
                <h2 className="text-2xl font-bold">{stats.totalApplicants}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <FileTextOutlined style={{ fontSize: 30, color: "#52c41a" }} />
              <div className="ml-4">
                <p className="text-gray-500">Total Jobs</p>
                <h2 className="text-2xl font-bold">{stats.totalJobs}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <ProfileOutlined style={{ fontSize: 30, color: "#faad14" }} />
              <div className="ml-4">
                <p className="text-gray-500">New Applications</p>
                <h2 className="text-2xl font-bold">{stats.newApplications}</h2>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <PlusCircleOutlined style={{ fontSize: 30, color: "#eb2f96" }} />
              <div className="ml-4">
                <p className="text-gray-500">Active Jobs</p>
                <h2 className="text-2xl font-bold">{stats.activeJobs}</h2>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HrDashboard;
