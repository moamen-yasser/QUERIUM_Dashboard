import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const Api = createApi({
    reducerPath: 'Api', 
    baseQuery: fetchBaseQuery({ baseUrl }), 
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (params) => ({
                url: '/Admin/login', 
                method: 'POST',
                body: params, 
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useLoginMutation } = Api;