
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const editProfileApi = createApi({
    reducerPath: 'editProfileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        editProfilev2: builder.mutation({
            query: ({ body, id }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body,
            }),
        })
    }),
});


export const {
    useEditProfilev2Mutation,
} = editProfileApi;

