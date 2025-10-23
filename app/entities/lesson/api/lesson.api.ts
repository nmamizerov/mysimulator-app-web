import { baseApi } from "@/shared/api";
import type { Lesson } from "../model/types";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<Lesson[], void>({
      query: () => "/lessons",
      providesTags: ["Lessons"],
    }),
    startLesson: builder.mutation<
      { last_simulator_id: number },
      { lessonId: number }
    >({
      query: ({ lessonId }) => ({
        url: `/lessons/${lessonId}/start`,
        method: "POST",
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const { useGetLessonsQuery, useStartLessonMutation } = lessonApi;
