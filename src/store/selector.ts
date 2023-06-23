import { RootState } from './store'
import { createSelector } from '@reduxjs/toolkit'
import { State } from './types'

export const tasksState = (state: RootState): State => state.tasksSlise

export const tasksSelector = createSelector(
    tasksState,
  (state: State) => state.tasks
)