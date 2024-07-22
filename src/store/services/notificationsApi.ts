import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (body) => ({
        url: `/notifications`,
        method: 'POST',
        body,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
    }),
    getNotificationsByUser: builder.query({
      query: (userId) => ({
        url: `/notifications/user/${userId}`,
      }),
    }),
  })
})

export const { 
  useCreateNotificationMutation, 
  useDeleteNotificationMutation, 
  useGetNotificationsByUserQuery
} = notificationsApi;

