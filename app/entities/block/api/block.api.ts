import { baseApi } from "@/shared/api";

interface CompleteBlockRequest {
  answer: string;
  id: number;
}

export const blockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeBlock: builder.mutation<
      void,
      { userBlockId: number; data: CompleteBlockRequest }
    >({
      query: ({ userBlockId, data }) => ({
        url: `/user_blocks/${userBlockId}/complete`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { userBlockId }) => [
        "Simulator",
        { type: "Simulator", id: `${userBlockId}` },
      ],
    }),
  }),
});

export const { useCompleteBlockMutation } = blockApi;
