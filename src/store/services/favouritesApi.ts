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
        url: `/favourites/get/${userId}`,
      }),
    }),

    deleteFavourite: builder.mutation({
      query: (id) => ({
        url: `/favourites/delete/${id}`,
        method: 'DELETE',
    }),
  }),

     addFavourite: builder.mutation({
       query: (body) => ({
        url: `/favourites/add`,
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