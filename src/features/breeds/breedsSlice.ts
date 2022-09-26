import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Item, Result, Results } from '../../types/Breed';
import { apiSlice } from '../api/apiSlice';

export interface Breed {
	id: string;
	name: string;
    type: string;
	is_active: boolean;
	created_at: string;	
}

const endpointUrl = '/breeds';

const getBreedsByType = (petType: string) => {
	return {
		url: `${endpointUrl}/type/${petType}`,
		method: 'GET',
	};
};


export const breedApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getBreeds: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ['Breeds'],
		}),
		getBreedsByType: query<Item[], {petType: string}>({
			query: ({petType}) => getBreedsByType(petType),
			providesTags: ['Breeds'],
		}),
	}),
});

export const { useGetBreedsQuery, useGetBreedsByTypeQuery } =
	breedApiSlice;


const breed: Breed = {
	id: 'ea68b7d8-0727-4960-87c3-0e98ed297a93',
	name: 'Belgian Shepherd',
    type: 'DOG',
	is_active: true,
	created_at: '2021-01-01 00:00:00',	
};

export const initialState = [
		breed,
		{ ...breed, id: '1c34dc04-cb43-481a-8851-5e5eb0fbc980', name: 'Persian', type: 'CAT', breed: 'Persian' },
		{ ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e364', name: 'Breed 3'},  
        { ...breed, id: '7745ac73-e14e-44ee-ab18-cc433680df0f', name: 'Breed 4'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e367', name: 'Breed 5'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e368', name: 'Breed 6', type: 'CAT'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e369', name: 'Breed 7', type: 'CAT'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e373', name: 'Breed 8'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e370', name: 'Breed 9'},
        { ...breed, id: 'e10813a2-1793-4f1f-8b5e-7a0f0472e371', name: 'Breed 10', type: 'CAT'},
];

const breedSlice = createSlice({
	name: 'breed',
	initialState: initialState,
	reducers: {
		createBreed: (state, action) => {
			state.push(action.payload);
		},
		updateBreed: (state, action) => {
			const index = state.findIndex(
				(breed) => breed.id === action.payload.id
			);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
		deleteBreed: (state, action) => {
			const index = state.findIndex(
				(breed) => breed.id === action.payload.id
			);

			state.splice(index, 1);
		},
	},
});

export const selectBreeds = (state: RootState) => state.breeds;

export const selectBreedByType = (state: RootState, type: string) => {
    return state.breeds.filter((breed) => breed.type === type);
};

export const selectBreedById = (state: RootState, id: string) => {
	const breed = state.breeds.find((breed: any) => breed.id === id);

	return (
		breed || {
			id: '',
			name: '',
			type: '',			
			is_active: true,			
			created_at: '',			
		}
	);
};

export default breedSlice.reducer;

export const { createBreed, updateBreed, deleteBreed } = breedSlice.actions;
