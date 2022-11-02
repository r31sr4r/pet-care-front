import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	PreloadedState,
} from '@reduxjs/toolkit';
import petsReducer, { petApiSlice } from '../features/pets/petsSlice';
import breedsReducer, { breedApiSlice } from '../features/breeds/breedsSlice';
import { apiSlice } from '../features/api/apiSlice';
import { userApiSlice } from '../features/users/usersSlice';

const rootReducer = combineReducers({
	pets: petsReducer,
	breeds: breedsReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[breedApiSlice.reducerPath]: apiSlice.reducer,
	[petApiSlice.reducerPath]: apiSlice.reducer,
	[userApiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
	});
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
