import {
	VaccinationRecord,
	Results,
	Result,
} from '../../types/VaccinationRecord';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/vaccination-records';

const getVaccinationRecordById = ({ id }: { id: string }) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

const getVaccinationRecordsByPet = (pet_id: string) => {
	return {
		url: `${endpointUrl}?filter=${pet_id}`,
		method: 'GET',
	};
};

const getVaccinationRecordsByPetAndVaccine = (pet_id: string, id: string) => {
	return {
		url: `${endpointUrl}/vaccine/${id}?filter=${pet_id}`,
		method: 'GET',
	};
};

function createVaccinationRecordMutation(
	vaccination_record: VaccinationRecord
) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: vaccination_record,
	};
}

export const vaccinationRecordApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getVaccinationRecord: query<Result, { id: string }>({
			query: getVaccinationRecordById,
			providesTags: ['VaccinationRecords'],
		}),
		getVaccinationRecordsByPet: query<Results, { id: string }>({
			query: ({ id }) => getVaccinationRecordsByPet(id),
			providesTags: ['VaccinationRecords'],
		}),
		getVaccinationRecordsByPetAndVaccine: query<
			Results,
			{ pet_id: string; id: string }
		>({
			query: ({ pet_id, id }) =>
				getVaccinationRecordsByPetAndVaccine(pet_id, id),
			providesTags: ['VaccinationRecords'],
		}),
		createVaccinationRecord: mutation<Results, VaccinationRecord>({
			query: createVaccinationRecordMutation,
			invalidatesTags: ['VaccinationRecords'],
		}),
	}),
});

export const {
	useGetVaccinationRecordQuery,
	useGetVaccinationRecordsByPetQuery,
	useGetVaccinationRecordsByPetAndVaccineQuery,
	useCreateVaccinationRecordMutation,
} = vaccinationRecordApiSlice;
