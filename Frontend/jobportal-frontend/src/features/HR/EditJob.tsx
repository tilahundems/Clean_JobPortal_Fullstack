import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchJobById, updateJob } from "../jobs/jobs.service";
import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, message, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const EditJob: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [msgapi ,contextholder] = message.useMessage();


  // Fetch job details
  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id? id : ""),
    enabled: !!id,
  });  

   // Mutation for update
  const mutation = useMutation({
    mutationFn: (updated: any) => updateJob(id? id : "" , updated),
    onSuccess: () => {
      msgapi.success("Job updated successfully!");
      setTimeout(() => {
        navigate("/ManageJobs");
      }, 1500);
      
    },
    onError: (err: any) => {
      msgapi.error(err.response?.data?.message || "Job update failed");
    },
  });

 // Sync job data into form when fetched
  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        ...job,
        ExpiryDate: dayjs(job.expiryDate),
      });
    }
  }, [job, form]);

  const onFinish = (values: any) => {
    mutation.mutate({
      ...values,
          Id: id, 
     ExpiryDate : values.ExpiryDate.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Edit Job</h1>
        {contextholder}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...job,
            deadline: dayjs(job?.expiryDate),
          }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: "Please input job title" }]}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>


            <Col xs={24} md={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please input location" }]}
              >
                <Input size="middle" />
              </Form.Item>
            </Col>

         

            <Col xs={24} md={12}>
              <Form.Item
                label="Deadline"
                name="ExpiryDate"
                rules={[{ required: true, message: "Please select deadline" }]}
              >
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  size="middle"
                  disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
             <div className="justify-center flex items-center"> 
            <Button type="primary" htmlType="submit" className="  w-1/2" loading={mutation.isPending} >
              Update Job
            </Button>
            
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditJob;

