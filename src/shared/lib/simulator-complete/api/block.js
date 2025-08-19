import { api } from "@/shared/api";

export const completeBlock = async (data) => {
  const resposne = await api.patch(`/user_blocks/${data.id}/complete/`, data);
  return resposne.data;
};
