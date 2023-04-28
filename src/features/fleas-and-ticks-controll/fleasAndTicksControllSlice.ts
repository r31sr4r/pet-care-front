import {
	FleasAndTicksControll,
	Results,
	Result,
	SearchParams,
} from '../../types/FleasAndTicksControll';
import { SortDirection } from '../../types/SortDirection';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/fleas-and-ticks-controll';

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

function getFleasAndTicksControll({
	page = 1,
	per_page = 10,
	sort = '',
	sort_dir = 'asc' as SortDirection,
	filter = '',
}) {
	const params = { page, per_page, sort, sort_dir, filter };

	return `${endpointUrl}?${parseQueryParams(params)}`;
}

const getFleasAndTicksControllById = ({ id }: { id: string }) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

const getFleasAndTicksControllByGuidId = (id: string ) => {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
};

const getFleasAndTicksControllByPet = (pet_id: string) => {
	return {
		url: `${endpointUrl}?filter=${pet_id}`,
		method: 'GET',
	};
};

function createFleasAndTicksControllMutation(
	fleas_and_ticks_controll: FleasAndTicksControll
) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: fleas_and_ticks_controll,
	};
}

function updateFleasAndTicksControllMutation(
	fleas_and_ticks_controll: FleasAndTicksControll
) {
	return {
		url: `${endpointUrl}/${fleas_and_ticks_controll.id}`,
		method: 'PUT',
		body: fleas_and_ticks_controll,
	};
}

function deleteFleasAndTicksControllMutation(fleas_and_ticks_controll: FleasAndTicksControll) {
	return {
		url: `${endpointUrl}/${fleas_and_ticks_controll.id}`,
		method: 'DELETE',
	};
}

export const fleasAndTicksControllApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getFleasAndTicksControll: query<Results, SearchParams>({
			query: getFleasAndTicksControll,
			providesTags: ['FleasAndTicksControll'],
		}),
		getFleasAndTicksControllById: query<Result, { id: string }>({
			query: getFleasAndTicksControllById,
			providesTags: ['FleasAndTicksControll'],
		}),
		getFleasAndTicksControllByGuidId: query<Results, { id: string }>({
			query: ({ id }) => getFleasAndTicksControllByGuidId(id),
			providesTags: ['FleasAndTicksControll'],
		}),
		getFleasAndTicksControllByPet: query<Results, { id: string }>({
			query: ({ id }) => getFleasAndTicksControllByPet(id),
			providesTags: ['FleasAndTicksControll'],
		}),
		createFleasAndTicksControll: mutation<Results, FleasAndTicksControll>({
			query: createFleasAndTicksControllMutation,
			invalidatesTags: ['FleasAndTicksControll'],
		}),
		updateFleasAndTicksControll: mutation<Results, FleasAndTicksControll>({
			query: updateFleasAndTicksControllMutation,
			invalidatesTags: ['FleasAndTicksControll'],
		}),
		deleteFleasAndTicksControll: mutation<Result, { id: string }>({
			query: deleteFleasAndTicksControllMutation,
			invalidatesTags: ['FleasAndTicksControll'],
		}),
				
	}),
});

export const {
	useGetFleasAndTicksControllQuery,
	useGetFleasAndTicksControllByIdQuery,
	useGetFleasAndTicksControllByPetQuery,
	useGetFleasAndTicksControllByGuidIdQuery,
	useCreateFleasAndTicksControllMutation,
	useUpdateFleasAndTicksControllMutation,
	useDeleteFleasAndTicksControllMutation,
} = fleasAndTicksControllApiSlice;
