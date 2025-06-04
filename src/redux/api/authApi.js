import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for login
    signIn: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        data,
      }),
      providesTags: [tagTypes.auth],
    }),

    signOut: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/sign-out`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resend-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forget-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: `${AUTH_URL}/get-me`,
        method: "GET",
      }),
      providesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useForgetPasswordMutation,
  useResendOTPMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useGetMyProfileQuery,
} = authApi;
