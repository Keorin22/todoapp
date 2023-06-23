export interface State {
    tasks: Task[]
  }

  export type Task = {
    todo: string,
    completed: boolean,
    id: number
  }