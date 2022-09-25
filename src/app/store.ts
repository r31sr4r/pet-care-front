import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import petsReducer from '../features/pets/petsSlice';
import breedsReducer, { breedApiSlice } from '../features/breeds/breedsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
	reducer: {
		pets: petsReducer,
		breeds: breedsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[breedApiSlice.reducerPath]: apiSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
