import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi ({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    get: builder.query({
      query: (param) => ({
        url: `Endpoint/${param}`
      }),
    }),
    login: builder.mutation({
      query: (token) => ({
        url: `/api/login`,
        method: 'POST'
      }),
    }),

    setDarkMode: builder.mutation({
      query: (id) => ({
        url: `/api/users/setDarkMode/${id}`,
        method: 'POST'
      }),
    }),
  })
});

export const {
  useLoginMutation,
  useSetDarkModeMutation,
} = authApi;