import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost:3001';

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: [
		'Breeds',
		'Pets',
		'Users',
		'Vaccines',
		'Brands',
		'VaccineSchedules',
	],
	endpoints: (builder) => ({}),
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
});
