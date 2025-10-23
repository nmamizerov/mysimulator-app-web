import { baseApi } from "@/shared/api";
import type {
  SessionResponse,
  LoginRequest,
  RegisterRequest,
  User,
  CreateCharacterRequest,
} from "../model/types";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<User, void>({
      query: () => ({ url: "/user_info", method: "GET" }),
      providesTags: ["User"],
    }),
    createCharacter: builder.mutation<void, CreateCharacterRequest>({
      query: (body) => ({ url: "/create_character", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<SessionResponse, LoginRequest>({
      query: (body) => ({ url: "/login", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<SessionResponse, RegisterRequest>({
      query: (body) => ({ url: "/register", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useCreateCharacterMutation,
} = sessionApi;
