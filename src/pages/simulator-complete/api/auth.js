import { api } from "@/shared/api";

export const mockAuth = async (data) => {
  return api.post("/token_auth", data);
};
