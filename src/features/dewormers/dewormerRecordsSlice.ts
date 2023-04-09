import {
	DewormerRecord,
	Results,
	Result,
} from '../../types/DewormerRecord';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/dewormer-records';

const getDewormerRecordById = ({ id }: { id: string }) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

const getDewormerRecordsByPet = (pet_id: string) => {
	return {
		url: `${endpointUrl}?filter=${pet_id}`,
		method: 'GET',
	};
};

function createDewormerRecordMutation(
	Dewormer_record: DewormerRecord
) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: Dewormer_record,
	};
}

function updateDewormerRecordMutation(
	Dewormer_record: DewormerRecord
) {
	return {
		url: `${endpointUrl}/${Dewormer_record.id}`,
		method: 'PUT',
		body: Dewormer_record,
	};
}

export const DewormerRecordApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getDewormerRecord: query<Result, { id: string }>({
			query: getDewormerRecordById,
			providesTags: ['DewormerRecords'],
		}),
		getDewormerRecordsByPet: query<Results, { id: string }>({
			query: ({ id }) => getDewormerRecordsByPet(id),
			providesTags: ['DewormerRecords'],
		}),
		createDewormerRecord: mutation<Results, DewormerRecord>({
			query: createDewormerRecordMutation,
			invalidatesTags: ['DewormerRecords'],
		}),
		updateDewormerRecord: mutation<Results, DewormerRecord>({
			query: updateDewormerRecordMutation,
			invalidatesTags: ['DewormerRecords'],
		}),
	}),
});

export const {
	useGetDewormerRecordQuery,
	useGetDewormerRecordsByPetQuery,
	useCreateDewormerRecordMutation,
	useUpdateDewormerRecordMutation,
} = DewormerRecordApiSlice;
