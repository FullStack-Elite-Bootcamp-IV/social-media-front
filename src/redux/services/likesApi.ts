import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const likesApi = createApi ({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    createLike: builder.mutation({
      query: (body) => ({
        url: `api/likes/create`,
        method: 'POST',
        body,
      }),
    }),

    getAllLikes: builder.query({
      query: () => ({
        url: `api/likes/all`,
      }),
    }),

    deleteLike: builder.mutation({
      query: (id) => ({
        url: `api/likes/${id}`,
        method: 'DELETE',
      }),
    }),

    getLikesByPostId: builder.query({
      query: (postId) => ({
        url: `api/likes/post/${postId}`,
      }),
    }),

    getLikesByUserId: builder.query({
      query: (userId) => ({
        url: `api/likes/user/${userId}`,
      }),
    }),
  })
})

export const { 
  useCreateLikeMutation, 
  useGetAllLikesQuery, 
  useDeleteLikeMutation, 
  useGetLikesByPostIdQuery, 
  useGetLikesByUserIdQuery 
} = likesApi;