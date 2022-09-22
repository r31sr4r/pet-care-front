import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Pet {
	id: string;
	name: string;
    type: string;
    other_type: string;
    breed: string;
    birthday: string;
    customer_id: string;
    image_url: string;
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
    birthday: '2020-01-01',
    customer_id: '1',
    image_url: '',
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
		createPet: (state, action) => {},
		updatePet: (state, action) => {},
		deletePet: (state, action) => {},
	},
});

export const selectPets = (state: RootState) => state.pets;

export default petSlice.reducer;
