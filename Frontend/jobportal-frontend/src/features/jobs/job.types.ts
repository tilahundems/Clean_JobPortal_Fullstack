export interface JobDto {
  id: string;
  title: string;
  description: string;
  type: string;
  company: string;
  location?: string;
  postedDate: string;
  expiryDate: string;
  postedById?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Internship";
  deadline: string;
  description: string;
  posted_date?: string;
}


export interface createJobPayload {
 
  Title: string;
  Location: string;
  ExpiryDate: string;
  Description: string;
  PostedById?: "027bd94e-6d19-4130-ae5a-7929b9e9ae04";
}

export interface ApplicantProfileDto {
  id: string;
  fullName: string;
  phone: string;
  resumeUrl?: string;
  skills?: string;
  education?: string;
  userId: string;
}
export interface ApplicationDto {
  id: string;
  jobId: string;
  applicantProfileId: string;
  applicantProfile: ApplicantProfileDto | null;
  appliedDate: string;
  status: string;
  coverLetter: string;
  job: JobDto | null;
}

export interface ApplicationDto {
  id: string;
  jobId: string;
  applicantProfileId: string;
  applicantProfile: ApplicantProfileDto | null;
  appliedDate: string;
  status: string;
  coverLetter: string;
  job: JobDto | null;
}

export interface Application {
  id: string;
  applicantName: string;
  email?: string; // If you later add user email
  jobTitle: string;
  status: string;
  resumeUrl?: string;
  applicantProfile?: ApplicantProfileDto | null;
  coverLetter?: string;
}

export interface JobDto {
  id: string;
  title: string;
  description: string;
  location?: string;
  postedDate: string;
  expiryDate: string;
  postedById?: string;
}