export interface IProject {
  _id?: any,
  userId?: string
  category?: string
  descr?: string,
  priority?: number,
  completed?: boolean,
  created_at?: Date,
  modify_at?: Date,
  completed_at?: Date,
  expiring_at?: Date,
  enableExpiring?: boolean,
  id_prev?: string,
  modified?: boolean,
  pos?: number,
  order?: number,
  progressCalc?: number
}

export interface IParamIProject {
  categorySel?: string
  checkPending?: boolean
  id?: string
  objtodo?: IProject
  atfirst?: boolean
}

/*
export interface IDrag {
  field?: string
  idelemtochange?: string
  prioritychosen?: number
  oldIndex?: number
  newIndex?: number
  category: string
  atfirst?: boolean
}
*/

export interface IProjectsState {
  showtype: number
  projects: IProject[]
  insidePending: boolean
  visuLastCompleted: number
}
