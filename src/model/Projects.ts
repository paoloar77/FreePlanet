import objectId from '@src/js/objectId'
import { UserStore } from '@store'
import { tools } from '@src/store/Modules/tools'

export interface IAction {
  table: string
  type: number
  _id: any
  cat?: string
}

export interface IProject {
  _id?: any,
  userId?: string
  category?: string
  typeproj?: number
  id_main_project?: string
  id_parent?: string
  descr?: string
  longdescr?: string
  priority?: number
  statusproj?: number
  created_at?: Date
  modify_at?: Date
  completed_at?: Date
  expiring_at?: Date
  enableExpiring?: boolean
  id_prev?: string
  modified?: boolean
  favourite?: number
  pos?: number
  order?: number
  live_url?: string
  test_url?: string
  hoursplanned?: number
  hoursleft?: number
  hoursworked?: number
  progressCalc?: number
  begin_development?: Date
  hoursweeky_plannedtowork?: number
  endwork_estimate?: Date
  begin_test?: Date
  totalphases?: number
  actualphase?: number
  privacyread?: string
  privacywrite?: string
}

export interface IProjectsState {
  showtype: number
  projects: IProject[]
  insidePending: boolean
  visuLastCompleted: number
}

export const Privacy = {
  all: 'all',
  friends: 'friends',
  mygroup: 'mygroup',
  onlyme: 'onlyme'
}

export const TypeProj = {
  TYPE_PROJECT: 1,
  TYPE_SUBDIR: 2
}
