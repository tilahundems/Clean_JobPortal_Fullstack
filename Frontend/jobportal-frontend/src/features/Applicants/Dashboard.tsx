// src/features/applicants/Dashboard.tsx
import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const ApplicantDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Applicant Dashboard</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-md rounded-xl">
            <Statistic title="Applied Jobs" value={5} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-md rounded-xl">
            <Statistic title="Profile Completed" value={80} suffix="%" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-md rounded-xl">
            <Statistic title="Resume Uploaded" value="Yes" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicantDashboard;
