import {
	DewormerRecord,
	Results,
	Result,
	SearchParams,
} from '../../types/DewormerRecord';
import { SortDirection } from '../../types/SortDirection';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/dewormer-records';

function parseQueryParams(params: SearchParams) {
	const queryParams = new URLSearchParams();
	if (params.page) {
		queryParams.append('page', params.page.toString());
	}

	if (params.per_page) {
		queryParams.append('per_page', params.per_page.toString());
	}

	if (params.filter) {
		queryParams.append('filter', params.filter);
	}

	if (params.sort) {
		queryParams.append('sort', params.sort);
	}

	if (params.sort_dir) {
		queryParams.append('sort_dir', params.sort_dir);
	}

	return queryParams.toString();
}

function getDewormerRecords({
	page = 1,
	per_page = 10,
	sort = '',
	sort_dir = 'asc' as SortDirection,
	filter = '',
}) {
	const params = { page, per_page, sort, sort_dir, filter };

	return `${endpointUrl}?${parseQueryParams(params)}`;
}

const getDewormerRecordById = ({ id }: { id: string }) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

const getDewormerRecordByGuidId = (id: string ) => {
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

function deleteDewormerRecordMutation(Dewormer_record: DewormerRecord) {
	return {
		url: `${endpointUrl}/${Dewormer_record.id}`,
		method: 'DELETE',
	};
}

export const dewormerRecordApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getDewormerRecords: query<Results, SearchParams>({
			query: getDewormerRecords,
			providesTags: ['DewormerRecords'],
		}),
		getDewormerRecordById: query<Result, { id: string }>({
			query: getDewormerRecordById,
			providesTags: ['DewormerRecords'],
		}),
		getDewormerRecordsByGuidId: query<Results, { id: string }>({
			query: ({ id }) => getDewormerRecordByGuidId(id),
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
		deleteDewormerRecord: mutation<Result, { id: string }>({
			query: deleteDewormerRecordMutation,
			invalidatesTags: ['DewormerRecords'],
		}),
				
	}),
});

export const {
	useGetDewormerRecordsQuery,
	useGetDewormerRecordsByIdQuery,
	useGetDewormerRecordsByPetQuery,
	useGetDewormerRecordsByGuidIdQuery,
	useCreateDewormerRecordMutation,
	useUpdateDewormerRecordMutation,
	useDeleteDewormerRecordMutation,
} = dewormerRecordApiSlice;
