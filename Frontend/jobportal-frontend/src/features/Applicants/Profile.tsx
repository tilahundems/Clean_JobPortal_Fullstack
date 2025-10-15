// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchApplicantProfile } from "./applicant.service";
// import { Card, Descriptions,  Spin } from "antd";
// import type { ApplicantProfile } from "./applicant.types";
// import { baseURL } from "../../api/axios";

// const Profile: React.FC = () => {
//   const { data: profile, isLoading, isError } = useQuery<ApplicantProfile | null >({
//     queryKey: ["applicantProfile"],
//     queryFn: fetchApplicantProfile,
//   });

 
//   // const [showUploadModal, setShowUploadModal] = useState(false);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6">
//         <p className="text-red-600">Failed to load profile. Please try again.</p>
//       </div>
//     );
//   }

//   // const resumeUrl = profile?.resumeUrl;
//    const resumeUrl = profile?.resumeUrl ? `${baseURL}${profile.resumeUrl}` : null;


//   // const handleDownload = () => {
//   //   if (!resumeUrl) return;
//   //   const a = document.createElement("a");
//   //   a.href = resumeUrl;
//   //   a.download = "resume";
//   //   a.target = "_blank";
//   //   a.click();
//   // };

//   return (
//     <div className="p-6 bg-gray-50 ">
//       <div className="flex justify-center p-6">
//         <div className="w-full max-w-1xl bg-white p-6 shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       <Card className="shadow-md rounded-xl mb-6">
//         <Descriptions bordered column={1}>
//           <Descriptions.Item label="Full Name">{profile?.fullName ?? "N/A"}</Descriptions.Item>
//           <Descriptions.Item label="Email">{profile?.skills ?? "N/A"}</Descriptions.Item>
//           <Descriptions.Item label="Phone">{profile?.phone ?? "N/A"}</Descriptions.Item>
//           <Descriptions.Item label="Education">{profile?.education ?? "N/A"}</Descriptions.Item>
//         </Descriptions>

       
//       </Card>
      
      

//       <Card title="Resume" className="shadow-md rounded-xl">
//         {resumeUrl ? (
//           <iframe
//             src={resumeUrl}
//             title="Resume"
//             className="w-full h-[400px] border rounded-md"
//             style={{ minHeight: 300 }}
//           />
//         ) : (
//           <p className="text-gray-500">No resume uploaded.</p>
//         )}
//       </Card>

//       </div>
//       </div>

     
//     </div>
//   );
// };

// export default Profile;



import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApplicantProfile } from "./applicant.service";
import { Card, Descriptions, Spin } from "antd";
import type { ApplicantProfile } from "./applicant.types";
import { baseURL } from "../../api/axios";

const Profile: React.FC = () => {
  const { data: profile, isLoading, isError } = useQuery<ApplicantProfile | null>({
    queryKey: ["applicantProfile"],
    queryFn: fetchApplicantProfile,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-600 text-center">
          Failed to load profile. Please try again.
        </p>
      </div>
    );
  }

  const resumeUrl = profile?.resumeUrl ? `${baseURL}${profile.resumeUrl}` : null;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            My Profile
          </h2>

          {/* Profile Info Card */}
          <Card className="shadow-md rounded-xl mb-6">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Full Name">
                {profile?.fullName ?? "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Email">
                {profile?.email ?? "N/A"}
              </Descriptions.Item> */}
              <Descriptions.Item label="Phone">
                {profile?.phone ?? "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Education">
                {profile?.education ?? "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Skills">
                {profile?.skills ?? "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Resume Card */}
          <Card title="Resume" className="shadow-md rounded-xl">
            {resumeUrl ? (
              <iframe
                src={resumeUrl}
                title="Resume"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] border rounded-md"
                style={{ minHeight: 300 }}
              />
            ) : (
              <p className="text-gray-500 text-center">No resume uploaded.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
