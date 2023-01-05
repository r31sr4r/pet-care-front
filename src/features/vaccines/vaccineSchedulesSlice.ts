import { Results } from '../../types/Vaccine';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/vaccines-schedule';

const getVaccineSchedulesByVaccine = (vaccine_id: string) => {
	return {
		url: `${endpointUrl}?filter=${vaccine_id}`,
		method: 'GET',
	};
};

const getVaccineScheduleById = ({ id }: { id: string }) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

export const vaccineScheduleApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query }) => ({
		getVaccineSchedulesByVaccine: query<Results, { vaccine_id: string }>({
			query: ({ vaccine_id }) => getVaccineSchedulesByVaccine(vaccine_id),
			providesTags: ['VaccineSchedules'],
		}),
		getVaccineScheduleById: query<Results, { id: string }>({
			query: getVaccineScheduleById,
			providesTags: ['VaccineSchedules'],
		}),
	}),
});

export const {
	useGetVaccineSchedulesByVaccineQuery,
	useGetVaccineScheduleByIdQuery,
} = vaccineScheduleApiSlice;
