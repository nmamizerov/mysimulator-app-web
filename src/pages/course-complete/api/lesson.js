import { api } from "@/shared/api";

export const getLessons = async () => {
  const response = await api.get(`/lessons`);
  return response.data;
};

export const updateCurrentLesson = async (data) => {
  const response = await api.patch("/lessons/current/", data);
  return response.data;
};

export const updateCurrentSimulator = async (data) => {
  const response = await api.patch("/lessons/current_simulator/", data);
  return response.data;
};
