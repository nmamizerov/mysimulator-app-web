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
  }),
});

export const { useGetSimulatorQuery } = simulatorApi;
