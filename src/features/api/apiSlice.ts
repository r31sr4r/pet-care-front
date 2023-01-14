import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { redirect, useNavigate } from 'react-router-dom';

export const baseUrl = 'http://localhost:3001';

const bq = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const loggedOut = () => ({
	type: 'api/apiSlice/loggedOut',
	redirectTo: '/signin',
	redirect: true,
});

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: [
		'Breeds',
		'Pets',
		'Users',
		'Vaccines',
		'Brands',
		'VaccineSchedules',
		'VaccinationRecords',
	],
	endpoints: (builder) => ({}),
	async baseQuery(args, api, extraOptions) {
		const result = await bq(args, api, extraOptions);
		if (result.error && result.error.status === 401) {
			console.log('unauthorized, logging out ...');
			redirect(`${baseUrl}/signin`);
			
			api.dispatch(loggedOut());
		} else if (result.error) {
			console.log('Error on fetch', result.error);
			throw result.error;
		}
		return result;
	},
	// baseQuery: fetchBaseQuery({
	// 	baseUrl,
	// 	prepareHeaders: (headers, { getState }) => {
	// 		const token = localStorage.getItem('token');
	// 		if (token) {
	// 			headers.set('authorization', `Bearer ${token}`);
	// 		}
	// 		return headers;
	// 	},
	// }),
});
