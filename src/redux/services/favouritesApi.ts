import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favouritesApi = createApi ({
  reducerPath: 'favouritesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    getFavouritesByUserId: builder.query({
      query: (userId) => ({
        url: `/api/favourites/get/${userId}`,
      }),
    }),

    deleteFavourite: builder.mutation({
      query: (id) => ({
        url: `/api/favourites/delete/${id}`,
        method: 'DELETE',
    }),
  }),

     addFavourite: builder.mutation({
       query: (body) => ({
        url: `/api/favourites/add`,
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