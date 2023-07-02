import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import { taskApi } from "../services/TasksApi";
import { authReducer } from "./auth";
export const store = configureStore({
    reducer: combineReducers({
        [taskApi.reducerPath]: taskApi.reducer,
        auth: authReducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
