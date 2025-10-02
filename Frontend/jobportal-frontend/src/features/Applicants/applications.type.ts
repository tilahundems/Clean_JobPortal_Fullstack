// src/types/applications.ts
import { type ApplicantProfile } from "./applicant.types";
import {type  JobDto } from "../jobs/job.types";

export interface Application {
  id: string; // Guid
  jobId: string;
  applicantProfileId: string;
  applicantProfile?: ApplicantProfile;
  appliedDate: string;
  status: string;
  coverLetter: string;
  job?: JobDto;
}
