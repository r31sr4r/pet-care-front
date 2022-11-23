import { Result, Results } from '../../types/Vaccine';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/vaccines';

const getVaccinesByBreedType = (breed_type: string) => {
	return {
		url: `${endpointUrl}/breed-type/${breed_type}`,
		method: 'GET',
	};
};

function getVaccineById({ id }: { id: string }) {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
}

export const vaccineApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query }) => ({
		getVaccinesByBreedType: query<Results, { breed_type: string }>({
			query: ({ breed_type }) => getVaccinesByBreedType(breed_type),
			providesTags: ['Vaccines'],
		}),
		getVaccine: query<Result, { id: string }>({
			query: getVaccineById,
			providesTags: ['Vaccines'],
		}),
	}),
});

export const {	
	useGetVaccinesByBreedTypeQuery,
	useGetVaccineQuery,	
} = vaccineApiSlice;


