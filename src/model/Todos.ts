import { IAction } from '@src/model/Projects'

export interface ITodo {
  _id?: any,
  userId?: string
  category?: string
  descr?: string,
  note?: string,
  priority?: number,
  statustodo?: number,
  created_at?: Date,
  modify_at?: Date,
  completed_at?: Date,
  expiring_at?: Date,
  enableExpiring?: boolean,
  modified?: boolean,
  pos?: number,
  order?: number,
  progress?: number
  progressCalc?: number
  phase?: number
  assigned_to_userId?: string
  hoursplanned?: number
  hoursworked?: number
  start_date?: Date
  themecolor?: string
  themebgcolor?: string
  assignedToUsers?: string[]
}

export interface IParamTodo {
  categorySel?: string
  checkPending?: boolean
  id?: string
  objtodo?: ITodo
  atfirst?: boolean
}

export interface IDrag {
  field?: string
  idelemtochange?: string
  prioritychosen?: number
  oldIndex?: number
  newIndex?: number
  category?: string
  id_proj?: string
  atfirst?: boolean
  tipoproj?: string
}

export interface ITodosState {
  showtype: number
  todos: {}
  categories: string[]
  // todos_changed: number
  reload_fromServer: number
  testpao: string
  insidePending: boolean
  visuLastCompleted: number
}

export interface IHours {
  _id?: any,
  userId?: string
  descr?: string,
  todoId?: string,
  date?: Date,
  time_start: number
  time_end: number
  hours: number
}
