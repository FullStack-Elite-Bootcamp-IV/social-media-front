import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentsApi = createApi ({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId) => ({
        url: `/comments/comment/${postId}`
      })
    }),

    addComent: builder.mutation({
      query: (body) => ({
        url: `/comments/create`,
        method: 'POST',
        body,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ body, commentId }) => ({
        url: `/comments/edit/${commentId}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/delete/${commentId}`,
        method: 'DELETE'
      }),
    }),
  })
});

export const {
  useGetCommentsByPostIdQuery,
  useAddComentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;