import { VaccinationRecord } from '../../types/VaccinationRecord';
import { Results } from '../../types/Vaccine';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/vaccination-records';

const getVaccinationRecordsByVaccine = (vaccine_id: string) => {
	return {
		url: `${endpointUrl}?filter=${vaccine_id}`,
		method: 'GET',
	};
};

function createVaccinationRecordMutation(vaccination_record: VaccinationRecord) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: vaccination_record,
	};
}

export const vaccinationRecordApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getVaccinationRecordsByVaccine: query<Results, { vaccine_id: string }>({
			query: ({ vaccine_id }) => getVaccinationRecordsByVaccine(vaccine_id),
			providesTags: ['VaccinationRecords'],
		}),
		createVaccinationRecord: mutation<Results, VaccinationRecord>({
			query: createVaccinationRecordMutation,
			invalidatesTags: ['VaccinationRecords'],
		}),
	}),
});

export const {	
	useGetVaccinationRecordsByVaccineQuery,
	useCreateVaccinationRecordMutation,
} = vaccinationRecordApiSlice;


