import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi ({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    messages: builder.mutation({
      query: () => ({
        url: `/api/messages`,
        method: 'POST',
      }),
    }),

    messagesByChatId: builder.query({
      query: (id) => ({
        url: `/api/messages/${id}`,
      }),
    }),

    deleteMessages: builder.mutation({
      query: (id) => ({
        url: `/api/messages/${id}`,
        method: 'DELETE',
      }),
    }),

    
    messagesByUserId: builder.query({
      query: (userId) => ({
        url: `/api/messages/${userId}`,
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
