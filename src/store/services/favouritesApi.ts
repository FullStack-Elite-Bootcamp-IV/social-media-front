import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favouritesApi = createApi ({
  reducerPath: 'favouritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({ 
    getFavouritesByUserId: builder.query({
      query: (userId) => ({
        url: `/favorites/user/${userId}`,
      }),
    }),

    deleteFavourite: builder.mutation({
      query: (body) => ({
        url: `/favorites/delete`,
        method: 'DELETE',
        body,
    }),
  }),

     addFavourite: builder.mutation({
       query: (body) => ({
        url: `/favorites/add`,
        method: 'POST',
        body,
    }),
  }), 
})
});

export const {
  useGetFavouritesByUserIdQuery,
  useDeleteFavouriteMutation,
  useAddFavouriteMutation,
} = favouritesApi;