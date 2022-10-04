import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = ' http://localhost:3001'

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Breeds', 'Pets'],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl }),
})