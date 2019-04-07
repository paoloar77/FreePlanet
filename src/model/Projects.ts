import objectId from '@src/js/objectId'
import { UserStore } from '@store'
import { tools } from '@src/store/Modules/tools'

export interface IProject {
  _id?: any,
  userId?: string
  category?: string
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
  pos?: number
  order?: number
  live_url?: string
  test_url?: string
  hoursplanned?: number
  hoursworked?: number
  progressCalc?: number
  begin_development?: Date
  hoursweeky_plannedtowork?: number
  endwork_estimate?: Date
  begin_test?: Date
  totalphases?: number
  actualphase?: number
}

export interface IProjectsState {
  showtype: number
  projects: IProject[]
  insidePending: boolean
  visuLastCompleted: number
}
