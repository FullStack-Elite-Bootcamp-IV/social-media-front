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
        url: `/followers`,
        method: 'POST',
        body,
      }),
    }),
    getfollowed: builder.query({
      query: (id) => ({
        url: `/followers/followings/${id}`,
      }),
    }),
    getfollowers: builder.query({
      query: (id) => ({
        url: `/followers/followers/${id}`,
      }),
    }),
    deleteFollower: builder.mutation({
      query: (id) => ({
        url: `/followers/${id}`,
        method: 'DELETE',
      }),
    }),
  })
})

export const { 
  useFollowersMutation, 

  useGetfollowedQuery, 
  useGetfollowersQuery, 
  
  useDeleteFollowerMutation 
} = followersApi