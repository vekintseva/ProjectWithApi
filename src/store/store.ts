import { configureStore } from "@reduxjs/toolkit";
import { initialApiService } from "./initialApiService";

export const store = configureStore({
  reducer: {
    [initialApiService.reducerPath]: initialApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(initialApiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
