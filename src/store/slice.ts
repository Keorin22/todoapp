import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State, Task } from './types'
import axios from 'axios';
import { title } from 'process';
import { WritableDraft } from 'immer/dist/internal';
export const initialState: State = {
  tasks: []
}

export const fetchTodos = createAsyncThunk('todos', async () => {
  const { data } = await axios.get('http://192.168.0.42:4444/todos/tasks');
  console.log(data)
  return data;  
});

// export const fetchRemovetodo = createAsyncThunk('todo/delete', async ({id}: {id:number}) =>
//   axios.delete(`http://192.168.0.42:4444/todos/delete`, ({id})),
// );
export const createTodo = createAsyncThunk('todo/create', async ({ todo, id }: { todo: string, id:number }) =>
  axios.post(`http://192.168.0.42:4444/todos/create`, ({ todo, id }))
  
);
export const changeTodoStatus = createAsyncThunk('todo/status', async ({ id }:  {id:number} ) =>
  axios.patch(`http://192.168.0.42:4444/todos/status`,({id})),
);

const tasksSlice = createSlice({
    name: 'Tasks',
    initialState,
    reducers:{
        addTask: (
            state: State,
            action: PayloadAction<Task>
    ) => ({
      ...state,
      tasks: [...state.tasks, action.payload],
    }),
    deleteTask: (
        state: State,
        action: PayloadAction<Task>
      ) => {
        state.tasks.splice(action.payload.id, 1)
        
        return state
      },
      completeTask: (state, action: PayloadAction<Task>) => {
        const completedTaskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (completedTaskIndex !== -1) {
          state.tasks[completedTaskIndex].completed = !state.tasks[completedTaskIndex].completed;
        }
      },
    },
    extraReducers: (builder) => {      
      builder.addCase(fetchTodos.fulfilled, (state, action)  => {
        state.tasks = action.payload;
        
      },    
      ) 
      builder.addCase(createTodo.fulfilled, (state: State, {payload}) => {
        state.tasks.push(payload as unknown as Task)
      })
      builder.addCase(changeTodoStatus.fulfilled, (state: State, {payload}) => {
        const completedTaskIndex = state.tasks.findIndex((task) => task.id === payload.meta as number);
        if (completedTaskIndex !== -1) {
          state.tasks[completedTaskIndex].completed = !state.tasks[completedTaskIndex].completed;
        }
      })
      
    },
})

export const { addTask, deleteTask, completeTask} = tasksSlice.actions
export default tasksSlice.reducer