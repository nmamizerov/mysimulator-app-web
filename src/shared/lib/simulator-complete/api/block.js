import { api } from "@/shared/api";

export const completeBlock = async (data) => {
  const response = await api.patch(`/user_blocks/${data.id}/complete`, data);
  return response.data;
};
