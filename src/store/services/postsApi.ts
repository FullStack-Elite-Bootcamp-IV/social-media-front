import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({

    createPost: builder.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: 'POST',
      }),
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/unlike`,
        method: 'POST',
      }),
    }),
    getPostsByUser: builder.query({
      query: (userId) => `/posts/user/${userId}`,
    }),
    getVisiblePostsByUser: builder.query({
      query: (userId) => `/posts/user/${userId}/visible`,
    }),
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,    
        };
      },
    }),
    getAllPublicsPosts: builder.query({
      query: () => `/posts`, 
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
  useUploadImageMutation,
  useGetAllPublicsPostsQuery,
} = postsApi;
