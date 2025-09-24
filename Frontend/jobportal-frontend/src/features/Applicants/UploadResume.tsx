// src/features/applicants/UploadResume.tsx
import React from "react";
import { Upload, message, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadResume: React.FC = () => {
  const props = {
    name: "file",
    multiple: false,
    accept: ".pdf,.doc,.docx",
    action: "/api/upload/resume", // backend endpoint later
    onChange(info: any) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>
      <Card className="shadow-md rounded-xl">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to upload</p>
          <p className="ant-upload-hint">Only PDF/DOC/DOCX allowed</p>
        </Dragger>
      </Card>
    </div>
  );
};

export default UploadResume;
