import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
endpoints actuales
  post:/api/notifications
  delete:/api/notifications/{id}
  get:/api/notifications/user/{userId}
*/


export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (body) => ({
        url: `/api/notifications`,
        method: 'POST',
        body,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/api/notifications/${id}`,
        method: 'DELETE',
      }),
    }),
    getNotificationsByUser: builder.query({
      query: (userId) => ({
        url: `/api/notifications/user/${userId}`,
      }),
    }),
  })
})

export const { useCreateNotificationMutation, useDeleteNotificationMutation, useGetNotificationsByUserQuery } = notificationsApi;

