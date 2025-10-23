import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    credentials: "include",
    prepareHeaders: (headers, { endpoint, arg }) => {
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
