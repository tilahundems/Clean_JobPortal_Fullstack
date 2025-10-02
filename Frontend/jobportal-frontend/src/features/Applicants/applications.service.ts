// src/features/applicants/applications.service.ts
import { api } from "../../api/axios";
import { type  Application } from "./applications.type";

export const fetchMyApplications = async (): Promise<Application[]> => {
  const res = await api.get("/api/Applications/MyApplications");
  console.log(res.data);
  return res.data;
};
