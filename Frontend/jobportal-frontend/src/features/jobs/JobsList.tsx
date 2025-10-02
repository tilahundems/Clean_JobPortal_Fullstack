import React from "react";
import { Card, Button, Row, Col, Tag, Skeleton, Empty, message, Typography } from "antd";
import { CalendarOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../../features/jobs/jobs.service";
import type { JobDto } from "../../features/jobs/job.types";

export default function JobList() {
  const navigate = useNavigate();

  const {
  data: jobs,
  isLoading,
  isError,
  error,
} = useQuery<JobDto[], Error>({
  queryKey: ["jobs"],
  queryFn: fetchJobs
});
const { Text } = Typography;
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
        <Row gutter={[16, 16]}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8}>
              <Card className="shadow-md">
                <Skeleton active paragraph={{ rows: 4 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (isError || !jobs || jobs === null) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
        <Empty description="No jobs available or failed to load" />
      </div>
    );
  }

//   return (
//     <>
    
// <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 flex justify-center">Available Jobs</h1>
//       <Row gutter={[16, 16]}>
//         {jobs.map((job) => (
//           <Col key={job.id} xs={24} sm={12} md={8}>
//             <Card
//              style={{ animation: "fadeInUp 900ms " }}
              
//               bordered={true}
//               className="shadow-md hover:shadow-xl transition-all"
//             >

//               <Text strong className="text-lg mb-4 block font-mono">
//                   {job.title}
//                 </Text>
//               {/* Description (truncated, styled) */}
//               <p className="mb-4 text-gray-600 line-clamp-3">{job.description}</p>

//               {/* Footer info row */}
//               <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-4">
//                 <span className="flex items-center gap-1 font-bold">
//                   <CalendarOutlined />{" "}
//            {job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : "—"}
//                 </span>
               
//                 <span className="flex items-center gap-1 ">
//                   <EnvironmentOutlined /> {job.location}
//                 </span>
//               </div>

//               {/* View details button */}
//               <Button
//               className="bg-[rgb(65,176,232)]"
//                 onClick={() => navigate(`/jobs/${job.id}`)}
//                 block
//               >
//                 View Details
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div></>
    
//   );
// }


return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Available Jobs</h1>

      <Row gutter={[16, 16]}>
        {jobs.map((job) => (
          <Col key={job.id} xs={24} sm={12} md={8}>
            <Card
              style={{ animation: "fadeInUp 900ms" }}
              bordered={true}
              className="shadow-md hover:shadow-xl transition-all"
            >
              {/* Title with controlled height to keep cards aligned */}
              <Text strong className="text-lg mb-2 block font-mono" style={{ minHeight: 28, display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {job.title}
              </Text>

              {/* Description with a fixed max height and line clamp */}
              <p
                className="mb-4 text-gray-600"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: 54, // ensures consistent space
                }}
              >
                {job.description}
              </p>

              {/* Footer info row: keep height consistent */}
              <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-4" style={{ minHeight: 28 }}>
                <span className="flex items-center gap-1 font-bold">
                  <CalendarOutlined />{" "}
                  {job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : "—"}
                </span>

                <span className="flex items-center gap-1">
                  <EnvironmentOutlined /> {job.location}
                </span>
              </div>

              {/* View details button - full width to align with card edges */}
              <Button
                className="w-full bg-[rgb(65,176,232)]"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}