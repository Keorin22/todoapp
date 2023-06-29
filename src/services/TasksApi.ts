import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { Task } from "../store/types";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.42:4444/todos' }),
    endpoints: (builder) => ({
      getTasks: builder.query<Task[], void>({
        query: () => '/tasks',
      }),
      createTask: builder.mutation<Task, Task>({
        query: (todo) => ({
          url: '/create',
          method: 'POST',
          body: todo,
        }),
      }),
      updateTask: builder.mutation<Task, Task>({
        query: (task) => ({
          url: `/status`,
          method: 'PATCH',
          body: task,
        }),
      }),
      deleteTask: builder.mutation<void, number>({
        query: (taskId) => ({
          url: `/delete/${taskId}`,
          method: 'delete'
        }),
      }),
    }),
  });