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
import { redirectToLoginMiddleware } from './redirectToLoginMiddleware';

const rootReducer = combineReducers({
	breeds: breedsReducer,		
	[apiSlice.reducerPath]: apiSlice.reducer,
	[breedApiSlice.reducerPath]: breedApiSlice.reducer,
	[petApiSlice.reducerPath]: petApiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
	[vaccineApiSlice.reducerPath]: vaccineApiSlice.reducer,
	[brandApiSlice.reducerPath]: brandApiSlice.reducer,
	[vaccineScheduleApiSlice.reducerPath]: vaccineScheduleApiSlice.reducer,
	[vaccinationRecordApiSlice.reducerPath]: vaccinationRecordApiSlice.reducer,
	[dewormerRecordApiSlice.reducerPath]: dewormerRecordApiSlice.reducer,
	[fleasAndTicksControllApiSlice.reducerPath]: fleasAndTicksControllApiSlice.reducer,
});


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
			.prepend(redirectToLoginMiddleware)
			.concat(apiSlice.middleware)
			.concat(breedApiSlice.middleware)
			.concat(petApiSlice.middleware)
			.concat(userApiSlice.middleware)
			.concat(vaccineApiSlice.middleware)
			.concat(brandApiSlice.middleware)
			.concat(vaccineScheduleApiSlice.middleware)
			.concat(vaccinationRecordApiSlice.middleware)
			.concat(dewormerRecordApiSlice.middleware)
			.concat(fleasAndTicksControllApiSlice.middleware)
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
