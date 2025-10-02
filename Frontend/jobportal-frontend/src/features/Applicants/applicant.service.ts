import { api } from "../../api/axios";
import  { type ApplicantProfile}  from  "./applicant.types";


export const fetchApplicantProfile = async (): Promise<ApplicantProfile> => {
  const res = await api.get("/api/ApplicantProfiles/me");
   console.log(res.data)
  return res.data;
};

// PUT update applicant profile (send only the fields you want to update)
export const updateApplicantProfile = async (
     payload: Partial<ApplicantProfile>): Promise<ApplicantProfile> => {
  const res = await api.post("/api/ApplicantProfiles/createOrUpdate", payload);
  console.log(res.data)
  return res.data;
   
};



 import { type  AxiosProgressEvent } from "axios";


export const uploadResume = async (opts: {
  formData: FormData;
  onUploadProgress?: (ev: AxiosProgressEvent) => void;
  profileId: string;
}): Promise<ApplicantProfile> => {
  const res = await api.post(
    `/api/ApplicantProfiles/${opts.profileId}/resume`,
    opts.formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: opts.onUploadProgress,
    }
  );
  return res.data;
};
