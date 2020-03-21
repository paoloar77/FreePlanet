import { RouteConfig, Route, RouteRecord } from 'vue-router/types'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import auth from '../middleware/auth'
import { GlobalStore, Projects, Todos, UserStore } from '@store'
import { RouteNames } from '@src/router/route-names'
import { IListRoutes, IMenuList } from '@src/model'
import { static_data } from '@src/db/static_data'

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

export const cfgrouter = {

  getmenu() {
    const arrroutes: IListRoutes[] = []

    for (const route of static_data.routes) {
      tools.addRoute(arrroutes, route)
    }

    return arrroutes
  }
}
