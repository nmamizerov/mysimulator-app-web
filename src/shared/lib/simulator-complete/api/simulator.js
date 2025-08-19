import { api } from "@/shared/api";

export const getSimulator = async (id) => {
  if (!id) return;
  const resposne = await api.get(`/simulator_complete/${id}`);
  return resposne.data;
};

export const startSimulator = async (id) => {
  if (!id) return;
  const resposne = await api.post(`/simulator_complete/${id}/start/`);
  return resposne.data;
};

export const resetSimulator = async (id) => {
  if (!id) return;
  const resposne = await api.put(`/simulator_complete/${id}/reset_completion/`);
  return resposne.data;
};
