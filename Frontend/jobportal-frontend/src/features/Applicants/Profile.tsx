import React from "react";
import { Card, Descriptions } from "antd";

const ApplicantProfile: React.FC = () => {
  // Example resume file (replace with uploaded file URL from backend)
  const resumeUrl = "";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Profile Details */}
      <Card className="shadow-md rounded-xl mb-6">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Full Name">Tilahun Dems</Descriptions.Item>
          <Descriptions.Item label="Email">tilahun@example.com</Descriptions.Item>
          <Descriptions.Item label="Phone">+251912345678</Descriptions.Item>
          <Descriptions.Item label="Skills">React, Node.js, .NET</Descriptions.Item>
          <Descriptions.Item label="Education">BSc in Computer Science</Descriptions.Item>
          <Descriptions.Item label="Experience">2 years as Web Developer</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Resume Viewer */}
      <Card title="Resume" className="shadow-md rounded-xl">
        {resumeUrl ? (
          <iframe
            src={resumeUrl}
            title="Resume"
            className="w-full h-[600px] border rounded-md"
          />
        ) : (
          <p className="text-gray-500">No resume uploaded.</p>
        )}
      </Card>
    </div>
  );
};

export default ApplicantProfile;
