import { baseApi } from "@/shared/api";
import type { Simulator } from "../model/types";

export const simulatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSimulator: builder.query<Simulator, { simulatorId: number }>({
      query: ({ simulatorId }) => `/simulator/${simulatorId}`,
      providesTags: (result, error, { simulatorId }) => [
        { type: "Simulator", id: `${simulatorId}` },
      ],
    }),
    startSimulator: builder.mutation<
      void,
      { simulator_id: number; lesson_user_id: number }
    >({
      query: ({ simulator_id, lesson_user_id }) => ({
        url: `/simulators/${simulator_id}/start`,
        method: "POST",
        body: { lesson_user_id },
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const { useGetSimulatorQuery, useStartSimulatorMutation } = simulatorApi;
