import { apiSlice } from "../apiSlice";
import { getUser } from "../user/userSlice";
import { setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    forgetPass: builder.mutation({
      query: (data) => ({
        url: "/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPass: builder.mutation({
      query: (data) => ({
        url: "/resetPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginMutation,
  useForgetPassMutation,
  useResetPassMutation,
} = authApi;
