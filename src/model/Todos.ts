export interface ITodo {
  id?: number,
  userId: string
  pos: number,
  descr?: string,
  priority: number,
  completed: boolean,
  created_at: any,
  modify_at: any,
  expiring_at: any
}

export interface ITodosState {
  visuOnlyUncompleted: boolean
}
