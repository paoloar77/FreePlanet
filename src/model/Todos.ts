export interface ITodo {
  _id?: any,
  userId: string
  category?: string
  descr?: string,
  priority: number,
  completed: boolean,
  created_at: any,
  modify_at: any,
  completed_at: any,
  expiring_at: any,
  enableExpiring?: boolean,
  id_prev?: string,
  id_next?: string,
  modified?: boolean,
  pos?: number,
  progress?: number
}

export interface ITodosState {
  visuOnlyUncompleted: boolean
  networkDataReceived: boolean
  todos: ITodo[]
  todos_changed: number
  reload_fromServer: boolean
  testpao: String
  insidePending: boolean
}
