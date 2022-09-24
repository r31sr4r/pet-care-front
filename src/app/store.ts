import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import petsReducer from '../features/pets/petsSlice';
import breedsReducer from '../features/breeds/breedsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pets: petsReducer,
    breeds: breedsReducer,
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
