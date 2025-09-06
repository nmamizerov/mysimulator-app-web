import { api } from "@/shared/api";

export const getSimulator = async (id) => {
  if (!id) return;
  const response = await api.get(`/simulator/${id}`);
  return response.data;
};

export const startSimulator = async (id) => {
  if (!id) return;
  const response = await api.post(`/simulator/${id}/start`);
  return response.data;
};

export const resetSimulator = async (id) => {
  if (!id) return;
  const response = await api.put(`/simulator/${id}/reset_completion`);
  return response.data;
};
