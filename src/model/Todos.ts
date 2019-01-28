export interface ITodo {
  id?: number,
  userId: string
  descr?: string,
  priority: number,
  completed: boolean,
  created_at: any,
  modify_at: any,
  expiring_at: any,
  enableExpiring?: boolean,
  id_prev?: number,
  id_next?: number,
  modified?: boolean,
  pos?: number
}

export interface ITodosState {
  visuOnlyUncompleted: boolean
}
