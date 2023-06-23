import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State, Task } from './types'
const initialState: State = {
  tasks: []
}

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
      completeTask: (
        state: State,
        action: PayloadAction<Task>
      ) => ({
        ...state,
        tasks: [...state.tasks, action.payload],
      }),
    }
})

export const { addTask, deleteTask, completeTask} = tasksSlice.actions
export default tasksSlice.reducer