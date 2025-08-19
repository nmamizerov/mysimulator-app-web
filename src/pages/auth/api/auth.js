import { api } from "@/shared/api";

export const login = async (data) => {
  const resposne = await api.post("/login/", data);
  return resposne.data;
};

export const register = async (data) => {
  const resposne = await api.post("/register/", data);
  return resposne.data;
};
