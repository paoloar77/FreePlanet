//export * from './LoginState';


export interface IResponse<T> {
  success?: boolean,
  message?: string,
  type: 'error'|'warning'
  data: T,
}

export interface ITab {
  title: string,
  icon?: any,
  condition?: boolean,
  childs?: boolean,
  badge?: number,
  to: {
    name: string,
    params?: {
      [x: string]: any
    }
  }
}