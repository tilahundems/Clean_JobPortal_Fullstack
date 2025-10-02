
import React from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToJob } from "./jobs.service";
import {type ApplyDto } from "./jobApplication.type";
import { useNavigate, useParams } from "react-router-dom";
import { fetchApplicantProfile } from "./applicant.service";
import type { ApplicantProfile } from "./applicant.types";

interface JobApplicationFormProps {
  onApplied?: () => void; // Callback after successful application
}


const JobApplicationForm: React.FC<JobApplicationFormProps> = ({

  onApplied,
}) => {

    const [msgApi, contextHolder] = message.useMessage();

  const { id } = useParams<{ id: string }>();
 const { data: profile, isLoading, isError } = useQuery<ApplicantProfile>({
    queryKey: ["applicantProfile"],
    queryFn: fetchApplicantProfile,
  });


 
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
    const navigate = useNavigate();
  

  const mutation = useMutation({
    mutationFn: (dto: ApplyDto) => applyToJob(dto),
    onSuccess: (data) => {
      msgApi.success(`Application submitted successfully!`);
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      onApplied?.();
      form.resetFields();
       setTimeout(() => {
        navigate("/apps");
      }, 1500);
       
    },
    onError: (err: any) => {
      // msgApi.error(err.response.statusText || "Failed to submit application.");
      console.log(err);
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate({
        coverLetter: values.coverLetter,
        jobId: id!,
        applicantProfileId: profile?.id!,
    });
  };
    if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
 console.log(isError);
  if (isError) {
    return (
       
      <div className="p-6">
        <p className="text-red-600">Failed!! Please try again.{isError}</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
            {contextHolder}

      <Card className="w-full max-w-2xl shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Apply for Job
        </h2>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="coverLetter" label="Cover Letter" rules={[{ required: true, message: "Please enter your cover letter." }]}>
            <Input.TextArea rows={5} placeholder="Write your cover letter here..." />
          </Form.Item>

          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="px-6"
              loading={mutation.isPending}
            >
              Submit Application
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
