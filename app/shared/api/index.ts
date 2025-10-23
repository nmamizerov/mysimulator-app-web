import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.VITE_API_URL;
  }
  if (window.location.host === "localhost") {
    return "/api/v1";
  }
  return `${import.meta.env.VITE_API_URL}/api/v1`;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl(), credentials: "include" }),
  tagTypes: ["User", "Course", "Lessons", "Simulator", "CourseUser"],

  endpoints: () => ({}),
});
