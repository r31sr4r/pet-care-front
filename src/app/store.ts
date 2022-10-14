import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import petsReducer, { petApiSlice } from '../features/pets/petsSlice';
import breedsReducer, { breedApiSlice } from '../features/breeds/breedsSlice';
import { apiSlice } from '../features/api/apiSlice';
import { userApiSlice } from '../features/users/usersSlice';

export const store = configureStore({
	reducer: {
		pets: petsReducer,
		breeds: breedsReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[breedApiSlice.reducerPath]: apiSlice.reducer,
		[petApiSlice.reducerPath]: apiSlice.reducer,
		[userApiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,	
	Action<string>
>;
