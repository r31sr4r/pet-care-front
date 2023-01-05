import { Pet, Result, Results } from '../../types/Pet';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/pets';

const getPetsByCustomerID = (customer_id: string) => {
	return {
		url: `${endpointUrl}/customer/${customer_id}`,
		method: 'GET',
	};
};

function createPetMutation(pet: Pet) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: pet,
	};
}

function updatePetMutation(pet: Pet) {
	return {
		url: `${endpointUrl}/${pet.id}`,
		method: 'PUT',
		body: pet,
	};
}

function getPetById({ id }: { id: string }) {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'GET',
	};
}

export const petApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getPets: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ['Pets'],
		}),
		getPetsByCustomerID: query<Results, { customer_id: string }>({
			query: ({ customer_id }) => getPetsByCustomerID(customer_id),
			providesTags: ['Pets'],
		}),
		getPet: query<Result, { id: string }>({
			query: getPetById,
			providesTags: ['Pets'],
		}),
		createPet: mutation<Results, Pet>({
			query: createPetMutation,
			invalidatesTags: ['Pets'],
		}),
		updatePet: mutation<Results, Pet>({
			query: updatePetMutation,
			invalidatesTags: ['Pets'],
		}),
	}),
});

export const {
	useGetPetsQuery,
	useGetPetsByCustomerIDQuery,
	useGetPetQuery,
	useCreatePetMutation,
	useUpdatePetMutation,
} = petApiSlice;

