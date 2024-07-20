import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi ({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    get : builder.query({
      query: (param) => ({
        url: `Endpoint/${param}`
      }),
    }),
  })
})