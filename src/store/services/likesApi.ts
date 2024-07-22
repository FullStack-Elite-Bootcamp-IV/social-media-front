import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const likesApi = createApi ({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({ 
    createLike: builder.mutation({
      query: (body) => ({
        url: `/likes/create`,
        method: 'POST',
        body,
      }),
    }),

    getAllLikes: builder.query({
      query: () => ({
        url: `/likes/all`,
      }),
    }),

    deleteLike: builder.mutation({
      query: (id) => ({
        url: `/likes/${id}`,
        method: 'DELETE',
      }),
    }),

    getLikesByPostId: builder.query({
      query: (postId) => ({
        url: `/likes/post/${postId}`,
      }),
    }),

    getLikesByUserId: builder.query({
      query: (userId) => ({
        url: `/likes/user/${userId}`,
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