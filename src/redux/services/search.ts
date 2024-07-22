import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const socialMediaApi = createApi({
  reducerPath: 'socialMediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-media-api-1.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchPosts: builder.query({
      query: (search) => `/api/posts/search/${search}`,
    }),
    searchUsers: builder.query({
      query: (search) => `/api/users/search/${search}`,
    }),
  }),
});

export const {
  useSearchPostsQuery,
  useSearchUsersQuery,
} = socialMediaApi;
