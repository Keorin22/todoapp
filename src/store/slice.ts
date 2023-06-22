import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from './types'

const initialState: State = {
  tasks: []
}

const TaskSslice = createSlice({
    name: 'Tasks',
    initialState,
    reducers:{
        addTask: (
            state: State,
            action: PayloadAction<string>
    ) => ({
      ...state,
      tasks: [...state.tasks, action.payload],
    }),
    deleteTask: (
        state: State,
        action: PayloadAction<number>
      ) => {
        state.tasks.splice(action.payload, 1)
        
        return state
      }
    }
})

export const { addTask, deleteTask} = TaskSslice.actions
export default TaskSslice.reducer