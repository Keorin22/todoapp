/* eslint-disable */
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { Task, State } from "../store/types";
import { createSlice } from "@reduxjs/toolkit";

export const getAccessToken = () => {  
  return window.localStorage.getItem('token')
};

export const taskApi = createApi({
    reducerPath: 'taskApi',
    tagTypes: ['Tasks'],
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://192.168.0.42:4444/todos',
      prepareHeaders: (headers, { getState }) => {
        const token = getAccessToken();
        console.log(token)
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getTasks: builder.query<Task[], void>({
        query: () => '/tasks',
        providesTags: (result) => result
        ? [
          ...result.map( ({ id }) => ({ type: 'Tasks' as const, id})),
          { type: 'Tasks', id: 'LIST'},
        ]
        : [{type: 'Tasks', id: 'LIST'}]
      
      }),
      createTask: builder.mutation<Task, Task>({
        query: (todo) => ({
          url: '/create',
          method: 'POST',
          body: todo,
        }),
        invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
      }),
      updateTask: builder.mutation<Task, Task>({
        query: (task) => ({
          url: `/status`,
          method: 'PATCH',
          body: task,
        }),
        invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
      }),
      deleteTask: builder.mutation<void, number>({
        query: (taskId) => ({
          url: `/delete/${taskId}`,
          method: 'delete'
        }),
        invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
      }),
    }),
  });
