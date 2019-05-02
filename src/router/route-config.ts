import { RouteConfig, Route, RouteRecord } from 'vue-router/types'

import { tools } from '@src/store/Modules/tools'

import auth from '../middleware/auth'
import { Projects, Todos } from '@store'

interface IMyMeta {
  title?: string,
  headerShadow?: boolean,
  contentProp?: boolean,
  transparent?: boolean,
  isModal?: boolean,
  requiresAuth?: boolean,
  isTab?: boolean,
  noAuth?: boolean,
  asyncData?: (to?: IMyRoute | IMyRouteRecord) => Promise<{title?: string} | void>,
  isAuthorized?: (to?: any) => boolean
  middleware?: any[]
}

export interface IMyRoute extends Route {
  meta: IMyMeta,
  matched: IMyRouteRecord[]
}

export interface IMyRouteRecord extends RouteRecord {
  meta: IMyMeta,
}

export interface IMyRouteConfig extends RouteConfig {
  children?: IMyRouteConfig[],
  meta?: IMyMeta
}
