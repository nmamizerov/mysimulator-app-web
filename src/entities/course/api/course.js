import { api } from "@/shared/api";

export const getCourse = async () => {
  const response = await api.get(`/course`);
  return response.data;
};
