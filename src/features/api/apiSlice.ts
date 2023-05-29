import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/config';

export const baseUrl = config.getBaseUrl();

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
        'DewormerRecords',
        'FleasAndTicksControll'
    ],
    endpoints: (builder) => ({}),
    async baseQuery(args, api, extraOptions) {
        try {
            const result = await bq(args, api, extraOptions);
            return result;
        } catch (error) {
            console.error('Error on fetch', error);
            const castedError = error as any;
            if (castedError.status === 401 || castedError.status === 403) {
                throw { status: castedError.status, message: 'Unauthorized' };
            }
            throw error;
        }
    },
});
