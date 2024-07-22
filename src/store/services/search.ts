import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const socialMediaApi = createApi({
  reducerPath: 'socialMediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    searchPosts: builder.query({
      query: (search) => `/posts/search/${search}`,
    }),
    searchUsers: builder.query({
      query: (search) => `/users/search/${search}`,
    }),
  }),
});

export const {
  useSearchPostsQuery,
  useSearchUsersQuery,
} = socialMediaApi;
