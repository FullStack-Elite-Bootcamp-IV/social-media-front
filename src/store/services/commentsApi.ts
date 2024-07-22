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
        url: `/posts/${postId}/comments`
      })
    }),

    addComent: builder.mutation({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ postId, body, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
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