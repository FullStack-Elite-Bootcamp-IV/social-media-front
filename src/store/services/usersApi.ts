import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi ({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({ 
    getAllUsers: builder.query({
      query: () => ({
        url: `/users/users`,
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/users/by-id/${id}`,
      }),
    }),

    getUserByUserName: builder.query({
      query: (userName) => ({
        url: `/users/by-username/${userName}`,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),

    editProfile: builder.mutation({
      query: ({body, id}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUserNameQuery,
  useRegisterMutation,
  useEditProfileMutation,
  useDeleteUserMutation,
} = usersApi;