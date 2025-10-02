
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Tag, Skeleton, message, Empty } from "antd";
import { CalendarOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../../features/jobs/jobs.service";
import type { JobDto } from "../../features/jobs/job.types";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: job, isLoading, isError } = useQuery<JobDto, Error>({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id!),
    enabled: !!id,
    
    
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 flex justify-center">
        <Card className="w-full max-w-3xl shadow-lg">
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  if (isError || !job || job === null) {
    return (
      <div className="p-6 flex justify-center">
        <Empty description="Job not found or failed to load" />
      </div>
    );
  }

  return (
    <>
    
    <div className="p-4 sm:p-6 flex justify-center">
      <Card
       style={{ animation: "fadeInUp 900ms " }}
        title={
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="font-semibold text-lg  ">{job.title}</span>
            <Tag color="blue">{job.location}</Tag>
          </div>   }
        className="w-full max-w-3xl shadow-lg"
        
      >
        {/* Info row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-x-6 text-gray-500 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <UserOutlined /> {job.company}
          </span>
          <span className="flex items-center gap-1">
            <EnvironmentOutlined /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <CalendarOutlined />{" "}
           
           {job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : "—"}
          </span>
        </div>
          <p className="text-gray-400 mb-4 text-sm">
            <CalendarOutlined />{" "}
          Posted: {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "—"}
        </p>
        {/* Description */}
        <p className="mb-6 text-gray-700 leading-relaxed">{job.description}</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate("/jobs")}
            className="w-full sm:w-1/2 text-base"
          >
            Back to Jobs
          </Button>
          <Button
            className="w-full sm:w-1/2  text-base  bg-[rgb(65,176,232)]"
              onClick={() => navigate(`/apply`)}
          >
            Apply Now
          </Button>
        </div>
      </Card>
    </div>
    </>
  );
}
