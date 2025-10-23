import { baseApi } from "@/shared/api";
import type { Course, CourseUser } from "../model/types";

export interface SSRHeaders {
  host?: string;
  cookie?: string;
  [key: string]: string | undefined;
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<Course, SSRHeaders | void>({
      query: (headers) => ({ url: "/course", headers: headers || undefined }),
      providesTags: ["Course"],
    }),
    getCourseUser: builder.query<CourseUser, SSRHeaders | void>({
      query: (headers) => ({
        url: "/course/user",
        headers: headers || undefined,
      }),
      providesTags: ["CourseUser"],
    }),
    setCurrentLesson: builder.mutation<void, { lesson_id: number }>({
      query: (body) => ({
        url: "/course/current_lesson",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CourseUser"],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetCourseUserQuery,
  useSetCurrentLessonMutation,
} = courseApi;
