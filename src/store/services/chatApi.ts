import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi ({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),

    endpoints: (builder) => ({
        getChats: builder.query ({
        query: ({ id }) => ({
            url: `/chat/user/${id}`,
            method: 'GET',
        }),
        }),
    })
});

export const {
    useGetChatsQuery,
} = chatApi;