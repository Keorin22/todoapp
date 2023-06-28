import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import tasksSlise from "./slice"
import { taskApi } from "../services/TasksApi";
export const store = configureStore({
    reducer: combineReducers({
        [taskApi.reducerPath]: taskApi.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
