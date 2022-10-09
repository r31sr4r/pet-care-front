import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Result, Results } from '../../types/Pet';
import { apiSlice } from '../api/apiSlice';

export interface Pet {
	id: string;
	name: string;
	type: string;
	other_type: string;
	breed: string;
	gender: string;
	birth_date: string | null | undefined;
	microchip: string | null;
	neutered: boolean;
	customer_id: string;
	image_url: string;
	is_active: boolean;
	created_at: string | null;
}

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

const pet: Pet = {
	id: '1',
	name: 'Pet 1',
	type: 'Dog',
	other_type: '',
	breed: 'Belgian Shepherd',
	gender: 'Male',
	birth_date: '2020-01-01',
	microchip: null,
	neutered: false,
	customer_id: '1',
	image_url: '',
	is_active: true,
	created_at: '2021-01-01 00:00:00',
};

export const initialState = [
	pet,
	{ ...pet, id: '2', name: 'Pet 2', type: 'Cat', breed: 'Persian' },
	{ ...pet, id: '3', name: 'Pet 3', birth_date: null },
];

const petSlice = createSlice({
	name: 'pet',
	initialState: initialState,
	reducers: {
		createPet: (state, action) => {
			state.push(action.payload);
		},
		updatePet: (state, action) => {
			const index = state.findIndex(
				(pet) => pet.id === action.payload.id
			);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
		deletePet: (state, action) => {
			const index = state.findIndex(
				(pet) => pet.id === action.payload.id
			);

			state.splice(index, 1);
		},
	},
});

export const selectPets = (state: RootState) => state.pets;

export const selectPetById = (state: RootState, id: string) => {
	const pet = state.pets.find((pet: any) => pet.id === id);

	return (
		pet || {
			id: '',
			name: '',
			type: '',
			other_type: '',
			breed: '',
			gender: '',
			birth_date: null,
			microchip: null,
			neutered: false,
			customer_id: '',
			image_url: '',
			is_active: false,
			created_at: null,
		}
	);
};

export default petSlice.reducer;

export const { createPet, updatePet, deletePet } = petSlice.actions;
