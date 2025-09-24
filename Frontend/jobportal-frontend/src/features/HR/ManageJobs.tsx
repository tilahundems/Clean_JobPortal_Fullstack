import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal, Space, message, Typography } from "antd";
import { EditOutlined, DeleteOutlined, FileTextOutlined, CalendarOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  deadline?: string;
 posted_date?: string;
    description: string;
}

const demoJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Abay Tech",
    location: "Addis Ababa",
    deadline: "2025-09-30",
    posted_date: "2025-10-30",
    description:"We are looking for a passionate frontend developer to join our team. Responsibilities include building responsive UIs using React, TypeScript, and Tailwind. Experience with Ant Design is a plus!",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Abay Tech",
    location: "Addis Ababa",
    deadline: "2025-10-05",
    posted_date: "2025-10-30",
    description:
    "We are looking for a passionate frontend developer to join our team. Responsibilities include building responsive UIs using React, TypeScript, and Tailwind. Experience with Ant Design is a plus!",
  },
];

const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setJobs(demoJobs);
      setLoading(false);
    }, 500);
  }, []);

  const handleDeleteClick = (job: Job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      message.success(`${jobToDelete.title} deleted successfully!`);
    }
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen " >
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>

      <Row gutter={[16, 16]} >
        {jobs.map((job) => (
          <Col xs={24} sm={12} md={8} key={job.id}>
            <Card  style={{ animation: "fadeInUp 900ms " }}
              className="shadow-lg rounded-xl p-4 flex flex-col justify-between"
              hoverable
            >
              {/* Job Meta */}
              <div className="flex flex-wrap gap-3 text-gray-500 mb-2 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarOutlined className="text-blue-500" />
                  <Text type="secondary">{job.deadline || ""}</Text>
                </div>
                <div className="flex items-center gap-1">
                  <UserOutlined />
                  <Text>{job.company}</Text>
                </div>
                <div className="flex items-center gap-1">
                  <EnvironmentOutlined />
                  <Text>{job.location}</Text>
                </div>
                
              </div>

              {/* Job Title */}
              <Text strong className="text-lg mb-4 block">{job.title}</Text>

              {/* Description */}
        <p className="mb-6 text-gray-700 blo line-clamp-3 text-center ">{job.description}</p>
 
              {/* Action Buttons */}
              <Space direction="vertical" size="small" className="w-full">
                <Link to={`/ManageJobs/edit/${job.id}`}>
                  <Button icon={<EditOutlined />} type="primary" block>
                    Edit
                  </Button>
                </Link>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  block
                  onClick={() => handleDeleteClick(job)}
                >
                  Delete
                </Button>
                <Link to={`/ManageJobs/${job.id}/ViewApplications`}>
                  <Button icon={<FileTextOutlined />} block>
                    Applications
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={showDeleteModal}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        centered
      >
        {jobToDelete && (
          <p>
            Are you sure you want to delete <strong>{jobToDelete.title}</strong>?
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ManageJobs;
