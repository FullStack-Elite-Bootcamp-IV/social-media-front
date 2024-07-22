import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginBody, LoginResponse, LogoutBody, UserWithToken } from "@/types/user";

export const authApi = createApi ({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<void, LogoutBody>({
      query: (body) => ({
        url: `/logout`,
        method: 'POST',
        body,
      }),
    }),

    getCurrentUser: builder.query<UserWithToken, void>({
      query: () => ({
        url: `/me`,
        method: 'GET',
      }),
    }),

    setDarkMode: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/users/setDarkMode/${id}`,
        method: 'POST'
      }),
    }),
  })
});

export const {
  useLoginMutation,
  useSetDarkModeMutation,
  useLogoutMutation,
  useGetCurrentUserQuery
} = authApi;