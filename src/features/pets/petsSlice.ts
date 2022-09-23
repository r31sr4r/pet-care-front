import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Pet {
	id: string;
	name: string;
    type: string;
    other_type: string;
    breed: string;
	gender: string;
    birth_date: string;
    customer_id: string;
    image_url: string;
	is_active: boolean;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}

const pet: Pet = {
	id: '1',
	name: 'Pet 1',
    type: 'Dog',
    other_type: '',
    breed: 'Belgian Shepherd',
	gender: 'Male',
    birth_date: '2020-01-01',
    customer_id: '1',
    image_url: '',
	is_active: true,
	deleted_at: null,
	created_at: '2021-01-01 00:00:00',
	updated_at: '2021-01-01 00:00:00',
};

export const initialState = [
		pet,
		{ ...pet, id: '2', name: 'Pet 2', type: 'Cat', breed: 'Persian' },
		{ ...pet, id: '3', name: 'Pet 3' },  
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
	const pet = state.pets.find((pet) => pet.id === id);

	return (
		pet || {
			id: '',
			name: '',
			type: '',
			other_type: '',
			breed: '',
			gender: '',
			birth_date: '',
			customer_id: '',	
			image_url: '',			
			is_active: false,
			deleted_at: null,
			created_at: '',
			updated_at: '',
		}
	);
};

export default petSlice.reducer;

export const { createPet, updatePet, deletePet } = petSlice.actions;
