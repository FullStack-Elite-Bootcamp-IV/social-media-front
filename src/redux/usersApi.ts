import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi ({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/users/users`,
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/api/users/users/${id}`,
      }),
    }),

    getUserByUserName: builder.query({
      query: (userName) => ({
        url: `/api/users/users/${userName}`,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: `/api/users/register`,
        method: 'POST',
        body,
      }),
    }),

    editProfile: builder.mutation({
      query: ({body, id}) => ({
        url: `/api/users/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
    }),
  })
})