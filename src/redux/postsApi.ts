import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({
    // Endpoints para posts
    createPost: builder.mutation({
      query: (body) => ({
        url: '/api/posts',
        method: 'POST',
        body,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/posts/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}/like`,
        method: 'POST',
      }),
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}/unlike`,
        method: 'POST',
      }),
    }),
    getPostsByUser: builder.query({
      query: (userId) => `/api/posts/user/${userId}`,
    }),
    getVisiblePostsByUser: builder.query({
      query: (userId) => `/api/posts/user/${userId}/visible`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostsByUserQuery,
  useGetVisiblePostsByUserQuery,
} = postsApi;
