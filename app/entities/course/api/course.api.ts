import { baseApi } from "@/shared/api";
import type { Course, CourseUser } from "../model/types";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<Course, void>({
      query: () => "/course",
      providesTags: ["Course"],
    }),
    getCourseUser: builder.query<CourseUser, void>({
      query: () => "/course/user",
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
