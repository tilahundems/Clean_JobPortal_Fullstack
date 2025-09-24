import { api } from "../../api/axios";
import type { JobDto } from "./job.types";

export async function fetchJobs(): Promise<JobDto[]> {
  const { data } = await api.get<JobDto[]>("/api/Jobs");
  return data;
}
