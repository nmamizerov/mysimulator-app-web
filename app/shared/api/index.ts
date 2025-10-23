import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/core/store/store";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.VITE_API_URL;
  }
  if (window.location.host === "localhost") {
    return "/api/v1";
  }
  return import.meta.env.VITE_API_URL;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { endpoint, getState }) => {
      // Добавляем токен из Redux store
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // На клиенте - добавляем хост из window.location
      if (typeof window !== "undefined") {
        const host = window.location.host;
        headers.set("x-course-host", host);
        headers.set("course-host", host);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Course", "Lessons", "Simulator", "CourseUser"],

  endpoints: () => ({}),
});
