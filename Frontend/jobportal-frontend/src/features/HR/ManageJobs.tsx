
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJobs, deleteJob } from "../jobs/jobs.service";
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Space,
 
  Typography,
  Spin,
  message
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { type JobDto } from "../jobs/job.types";

const { Text } = Typography;

const ManageJobs: React.FC = () => {
  const queryClient = useQueryClient();
const [msgapi ,contextholder] = message.useMessage();
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobDto | null>(null);

  // Fetch jobs
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });


   
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      msgapi.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setShowDeleteModal(false);
      setJobToDelete(null);
    },
    onError: (err: any) => {
      msgapi.error(err.response?.data?.message || "Failed to delete job");
    },
  });

  // Handle delete
  const handleDeleteClick = (job: JobDto) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      deleteMutation.mutate(jobToDelete.id);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>
      {contextholder}
      {isLoading ? (
      <Spin className="flex flex-center justify-center" />
      ) : (
        <Row gutter={[16, 16]}>
          {jobs.map((job) => (
            <Col xs={24} sm={12} md={8} key={job.id}>
              <Card
                style={{ animation: "fadeInUp 900ms" }}
                className="shadow-lg rounded-xl p-4 flex flex-col justify-between"
                hoverable
              >
                {/* Job Meta */}
                <div className="flex flex-wrap gap-3 text-gray-500 mb-2 text-sm font-thin ">
                  <div className="flex items-center gap-1">
                    <CalendarOutlined className="text-blue-500" />
                    <Text type="secondary"> {job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : "—"}</Text>
                              

                  </div>
                
                  <div className="flex items-center  font-thin">
                    <EnvironmentOutlined />
                    <Text>{job.location}</Text>
                  </div>
                </div>

                {/* Job Title */}
             
              <Text strong className="text-lg mb-2 block font-mono" style={{ minHeight: 28, display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {job.title}
              </Text>

                {/* Description */}
                <p className="mb-6 text-gray-700 line-clamp-3 ">
                  {job.description}
                </p>


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
                  <Link to={`/applications/${job.id}`}>
                    <Button icon={<FileTextOutlined />} block>
                      Applications
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={showDeleteModal}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        centered
        confirmLoading={deleteMutation.isPending}
      >
        {jobToDelete && (
          <p>
            Are you sure you want to delete{" "}
            <strong>{jobToDelete.title}</strong>?
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ManageJobs;
