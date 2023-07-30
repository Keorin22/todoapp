export interface State {
    tasks: Task[]
  }

  export type Task = {
    todo: string,
    completed: boolean,
    id?: number
  }
  export type AuthData = {
    login: string,
    password: string
  }
  export interface StateAuth {
    auth: {
      data: any,
      status: string,
    }
    isAuth: boolean
  }
  export type FormValues = {
    email: string;
    password: string;
  }