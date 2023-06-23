import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksSlise from "./slice"

export const store = configureStore({
    reducer: combineReducers({
        tasksSlise
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
