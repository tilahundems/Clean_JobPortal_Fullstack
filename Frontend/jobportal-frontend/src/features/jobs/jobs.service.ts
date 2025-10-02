import { api } from "../../api/axios";
import type { ApplicantProfileDto, createJobPayload, Job, JobDto } from "./job.types";

export async function fetchJobs(): Promise<JobDto[]> {
  const { data } = await api.get<JobDto[]>("api/Jobs");
  return data;
}

export async function fetchJobById(id: string): Promise<JobDto> {
  const { data } = await api.get<JobDto>(`api/Jobs/${id}`);
  return data;
}

export const createJob = async (job: Omit<createJobPayload, "id">): Promise<Job> => {
  const response = await api.post("api/hr/jobs/create", job);
  return response.data;
};




export const updateJob = async (id: string, job: Partial<Job>): Promise<Job> => {
  const response = await api.put(`api/hr/jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`api/hr/jobs/${id}`);
};




interface Application {
  id: string;
  applicantName: string;
  email?: string; // If you later add user email
  jobTitle: string;
  status: string;
  resumeUrl?: string;
  applicantProfile?: ApplicantProfileDto | null;
  coverLetter?: string;
}

 // Fetch applications
   export const fetchApplications = async ( id:string): Promise<Application[]> => {
    const res = await api.get(`api/hr/jobs/${id}/applications`);
    console.log(res.data)
    return res.data;
  };

