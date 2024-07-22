import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi ({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({ 
    messages: builder.mutation({
      query: () => ({
        url: `/messages`,
        method: 'POST',
      }),
    }),

    messagesByChatId: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
      }),
    }),

    deleteMessages: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
    }),

    
    messagesByUserId: builder.query({
      query: (userId) => ({
        url: `/messages/${userId}`,
      }),
    }),
  })
});


export const {
  useMessagesMutation,
  useMessagesByChatIdQuery,
  useDeleteMessagesMutation,
  useMessagesByUserIdQuery,
} = messagesApi;
