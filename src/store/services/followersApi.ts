import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followersApi = createApi ({
  reducerPath: 'followersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({ 
    followers: builder.mutation({
      query: (body) => ({
        url: `/followers/`,
        method: 'POST',
        body,
      }),
    }),
    getFollowed: builder.query({
      query: (id) => ({
        url: `/followers/followings/${id}`,
      }),
    }),
    getFollowers: builder.query({
      query: (id) => ({
        url: `/followers/user/${id}`,
      }),
    }),
    deleteFollower: builder.mutation({
      query: (body) => ({
        url: `/followers/delete`,
        method: 'DELETE',
        body,
      }),
    }),
  })
})

export const { 
  useFollowersMutation, 
  useGetFollowedQuery, 
  useGetFollowersQuery, 
  useDeleteFollowerMutation 
} = followersApi