import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/core/store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === "undefined" ? import.meta.env.VITE_API_URL : "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["User", "Course", "Lessons", "Simulator", "CourseUser"],

  endpoints: () => ({}),
});
