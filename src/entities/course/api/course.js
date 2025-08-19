import { api } from "@/shared/api";

export const getCourse = async () => {
  const resposne = await api.get(`/courses/get`);
  return resposne.data;
};
