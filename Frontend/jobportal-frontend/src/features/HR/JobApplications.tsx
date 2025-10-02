import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, baseURL } from "../../api/axios";
import {
  Table,
  Tag,
  Button,
  message,
  Space,
  Spin,
  Empty,
  Modal,
  Descriptions,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchApplications } from "../jobs/jobs.service";
import { useParams } from "react-router-dom";
import type { Application } from "../jobs/job.types";



const JobApplications: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  // Fetch applications and transform them
  const { data: applications = [], isLoading, isError } = useQuery<Application[]>({
    queryKey: ["job", id],
    queryFn: async () => {
      const data : Application[] = await fetchApplications(id ?? "");
      return data.map((a) => ({
        id: a.id,
        applicantName: a.applicantProfile?.fullName ?? "N/A",
        // email: a.applicantProfile?.userId ?? "N/A", // replace with actual email if available
        jobTitle: a.jobTitle ?? "N/A",
        status: a.status,
        resumeUrl: a.applicantProfile?.resumeUrl,
        applicantProfile: a.applicantProfile,
        coverLetter: a.coverLetter,
      }));
    },
  });

  
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await api.patch(`/applications/${id}`, { status });
    },
    onSuccess: () => {
      message.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["job", id] });
    },
    onError: () => {
      message.error("Failed to update status");
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Resume Download
  const handleDownload = (url?: string) => {
    if (!url) {
      message.warning("No resume uploaded");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.target = "_blank";
    link.click();
  };

  // Open Modal
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  // Table columns
  const columns: ColumnsType<Application> = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
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
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(url)}
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
            onClick={() => handleViewDetails(record)}
            icon={<EyeOutlined />}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={() => handleStatusChange(record.id, "Reviewed")}
            loading={updateStatusMutation.isPending}
          >
            Mark Reviewed
          </Button>
          <Button
            size="small"
            danger
            onClick={() => handleStatusChange(record.id, "Rejected")}
            loading={updateStatusMutation.isPending}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <Spin size="large" />
//         </div>
//       ) : isError ? (
//         <Empty description="Failed to load applications" />
//       ) : applications.length === 0 ? (
//         <Empty description="No applications found" />
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={applications}
//           rowKey="id"
//           pagination={{ pageSize: 5 }}
//           bordered
//         />
//       )}

//       {/* Details Modal */}
//       <Modal
//         title="Applicant Details"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//         width={800}
//         centered
//       >
//         {selectedApplication && (
//           <>
//             <Descriptions bordered column={1} size="small" className="mb-4">
//               <Descriptions.Item label="Name">
//                 {selectedApplication.applicantName}
//               </Descriptions.Item>
//               {/* <Descriptions.Item label="Email">
//                 {selectedApplication.email}
//               </Descriptions.Item> */}
//               <Descriptions.Item label="Job Title">
//                 {selectedApplication.jobTitle}
//               </Descriptions.Item>
//               <Descriptions.Item label="Status">
//                 <Tag color="blue">{selectedApplication.status}</Tag>
//               </Descriptions.Item>
//               <Descriptions.Item label="Cover Letter">
//                 {selectedApplication.coverLetter || "N/A"}
//               </Descriptions.Item>
//               <Descriptions.Item label="Skills">
//                 {selectedApplication.applicantProfile?.skills || "N/A"}
//               </Descriptions.Item>
//               <Descriptions.Item label="Education">
//                 {selectedApplication.applicantProfile?.education || "N/A"}
//               </Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {selectedApplication.applicantProfile?.phone || "N/A"}
//               </Descriptions.Item>
//             </Descriptions>

//             {selectedApplication.resumeUrl ? (
//               <iframe
//                 src={ selectedApplication.resumeUrl ? `${baseURL}${selectedApplication.resumeUrl}` : ""}
//                 title="Resume"
//                 style={{ width: "100%", height: "500px", border: "1px solid #ddd" }}
//               />
//             ) : (
//               <Empty description="No resume uploaded" />
//             )}
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

return (
  <div className="p-6 sm:p-4 min-h-screen bg-gray-50">
    <h1 className="text-3xl sm:text-2xl font-bold mb-6">Job Applications</h1>

    {isLoading ? (
      <div className="flex justify-center items-center h-64 sm:h-48">
        <Spin size="large" />
      </div>
    ) : isError ? (
      <Empty description="Failed to load applications" />
    ) : applications.length === 0 ? (
      <Empty description="No applications found" />
    ) : (
      // Make table responsive with horizontal scroll on small screens
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          // Optional: keep table width natural; on small screens the scroll container handles it
        />
      </div>
    )}

    {/* Details Modal */}
    <Modal
      title="Applicant Details"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      // Make modal width responsive: cap on large screens, full width on small
      width={undefined} // allow responsive width
      style={{ maxWidth: "90vw" }} // ensures modal never exceeds viewport
      centered
    >
      {selectedApplication && (
        <>
          <Descriptions bordered column={1} size="small" className="mb-4">
            <Descriptions.Item label="Name">
              {selectedApplication.applicantName}
            </Descriptions.Item>
            {/* Email can be added back if needed */}
            <Descriptions.Item label="Job Title">
              {selectedApplication.jobTitle}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="blue">{selectedApplication.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Cover Letter">
              {selectedApplication.coverLetter || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Skills">
              {selectedApplication.applicantProfile?.skills || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Education">
              {selectedApplication.applicantProfile?.education || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedApplication.applicantProfile?.phone || "N/A"}
            </Descriptions.Item>
          </Descriptions>

          {selectedApplication.resumeUrl ? (
            // Use a responsive iframe container
            <div style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}>
              <iframe
                src={baseURL + selectedApplication.resumeUrl}
                title="Resume"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ width: "100%", height: "60vh", border: "1px solid #ddd" }}
              />
            </div>
          ) : (
            <Empty description="No resume uploaded" />
          )}
        </>
      )}
    </Modal>
  </div>
);
};
export default JobApplications;
