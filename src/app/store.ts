import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	PreloadedState,
} from '@reduxjs/toolkit';
import { petApiSlice } from '../features/pets/petsSlice';
import breedsReducer, { breedApiSlice } from '../features/breeds/breedsSlice';
import { apiSlice } from '../features/api/apiSlice';
import { userApiSlice } from '../features/users/usersSlice';
import { vaccineApiSlice } from '../features/vaccines/vaccinesSlice';
import { brandApiSlice } from '../features/brands/brandsSlice';
import { vaccineScheduleApiSlice } from '../features/vaccines/vaccineSchedulesSlice';
import { vaccinationRecordApiSlice } from '../features/vaccines/vaccinationRecordsSlice';
import { dewormerRecordApiSlice } from '../features/dewormers/dewormerRecordsSlice';
import { fleasAndTicksControllApiSlice } from '../features/fleas-and-ticks-controll/fleasAndTicksControllSlice';

const rootReducer = combineReducers({
	breeds: breedsReducer,		
	[apiSlice.reducerPath]: apiSlice.reducer,
	[breedApiSlice.reducerPath]: apiSlice.reducer,
	[petApiSlice.reducerPath]: apiSlice.reducer,
	[userApiSlice.reducerPath]: apiSlice.reducer,
	[vaccineApiSlice.reducerPath]: apiSlice.reducer,
	[brandApiSlice.reducerPath]: apiSlice.reducer,
	[vaccineScheduleApiSlice.reducerPath]: apiSlice.reducer,
	[vaccinationRecordApiSlice.reducerPath]: apiSlice.reducer,
	[dewormerRecordApiSlice.reducerPath]: apiSlice.reducer,
	[fleasAndTicksControllApiSlice.reducerPath]: apiSlice.reducer,
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
