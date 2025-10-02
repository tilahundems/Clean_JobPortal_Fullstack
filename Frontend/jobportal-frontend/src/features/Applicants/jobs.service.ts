import { api } from "../../api/axios";
import { type  ApplyDto } from "./jobApplication.type";
import { type  Application } from "./applications.type";

export const applyToJob = async (dto: ApplyDto): Promise<Application> => {
  const res = await api.post("/api/applications/apply", dto);
  return res.data;
};
