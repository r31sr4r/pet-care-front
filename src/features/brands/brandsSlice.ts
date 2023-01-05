import { Results } from '../../types/Brand';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/brands';

const getBrandsByType = (brandType: string) => {
	return {
		url: `${endpointUrl}/brand-type/${brandType}?per_page=100`,
		method: 'GET',
	};
};

export const brandApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getBrands: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ['Brands'],
		}),
		getBrandsByType: query<Results, { brandType: string }>({
			query: ({ brandType }) => (brandType ? getBrandsByType(brandType) : ''),
			providesTags: ['Brands'],
		}),
	}),
});

export const { useGetBrandsQuery, useGetBrandsByTypeQuery } = brandApiSlice;


