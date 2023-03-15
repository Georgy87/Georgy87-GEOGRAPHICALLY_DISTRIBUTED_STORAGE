import { configureStore } from '@reduxjs/toolkit';

import continentsReducer from '../slices/continentsSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      continents: continentsReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
