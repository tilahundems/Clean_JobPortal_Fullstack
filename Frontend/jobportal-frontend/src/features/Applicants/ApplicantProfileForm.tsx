import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  Modal,
  Card,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  PaperClipOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchApplicantProfile,
  updateApplicantProfile,
} from "./applicant.service";
import type { ApplicantProfile } from "./applicant.types";
import UploadResume from "./UploadResume";

const { Option } = Select;

const ApplicantProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [msgApi, contextHolder] = message.useMessage();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // 1) Fetch profile
  const { data: profile, isLoading, isError } = useQuery<ApplicantProfile>({
    queryKey: ["applicantProfile"],
    queryFn: fetchApplicantProfile,
  });

  // 2) Mutation
  const updateMutation = useMutation({
    mutationFn: (payload: Partial<ApplicantProfile>) =>
      updateApplicantProfile(payload),
    onSuccess: (updated) => {
      msgApi.success("Profile saved");
      queryClient.setQueryData(["applicantProfile"], updated);
    },
    onError: (err: any) => {
      msgApi.error(err?.response?.data?.message || "Failed to save profile");
    },
  });

  // 3) Pre-fill form
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        fullName: profile.fullName,
        skills: profile.skills,
        phone: profile.phone,
        education: profile.education,
     resumeUrl: profile.resumeUrl,

      });
    }
  }, [profile, form]);

  // 4) Submit
  const onFinish = (values: any) => {
    const payload: Partial<ApplicantProfile> = {
      fullName: values.fullName,
      skills: values.skills,
      phone: values.phone,
      education: values.education,
      resumeUrl: values.resumeUrl,
    };
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  const resumeUrl = profile?.resumeUrl;

  const handleDownload = () => {
    if (!resumeUrl) return;
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "resume";
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {contextHolder}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item label="Skills" name="skills">
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder="Enter your skills"
              />
            </Form.Item>

            <Form.Item label="Education Level" name="education">
              <Select placeholder="Select education level" allowClear>
                <Option value="bachelor">Bachelor’s</Option>
                <Option value="master">Master’s</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </Form.Item>
                <Form.Item name="resumeUrl" hidden>
                 <Input type="hidden" />
               </Form.Item>

            {/* Resume Section */}
            <Form.Item label="Resume">
              <div className="flex items-center gap-4">
                {resumeUrl ? (
                  <>
                    <PaperClipOutlined className="text-blue-500" />
                    <span className="text-gray-700">Resume attached</span>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </>
                ) : (
                  <span className="text-gray-500">No resume uploaded</span>
                )}

                <Button
                  icon={<UploadOutlined />}
                  onClick={() => setShowUploadModal(true)}
                    className="px-6 w-2/4 "
                >
                  {resumeUrl ? "Change Resume" : "Upload Resume"}
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <div className="md:col-span-2 flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="px-6 w-4/6 mt-2"
                  loading={updateMutation.isPending}
                >
                  Save Changes
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        title="Upload Resume"
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        footer={null}
        width={700}
        centered
      >
        {profile?.id && (
          <UploadResume
            profileId={profile.id}
            onUploaded={ (resumeUrl) => {
          form.setFieldsValue({ resumeUrl });
          setShowUploadModal(false);
        }}
          />
        )
        }
      </Modal>
    </div>
  );
};

export default ApplicantProfileForm;
