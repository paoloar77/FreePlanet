import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosInterceptorManager } from 'axios'
// import LoginModule from '../Modules/Auth/LoginStore'
import router from '@router'
import { clone } from 'lodash'
import * as Types from './ApiTypes'
import { GlobalStore, UserStore } from '@store'
import { tools } from '@src/store/Modules/tools'
import { serv_constants } from '@src/store/Modules/serv_constants'

export const API_URL = process.env.MONGODB_HOST
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.DEBUG === '1')
      console.log(response)
    return response
  },
  (error) => {
    // console.log('error', error)
    if (error.response) {
      if (process.env.DEBUG === '1')
        console.log('Status = ', error.response.status)
      console.log('Request Error: ', error.response)
      if (error.response.status !== 0) {
        GlobalStore.mutations.setStateConnection('online')
      } else {
        GlobalStore.mutations.setStateConnection('offline')
      }
    } else {
      GlobalStore.mutations.setStateConnection('offline')
    }
    return Promise.reject(error)
  }
)

export const addAuthHeaders = () => {
  // axiosInstance.defaults.headers.Authorization = `Bearer ${LoginModule.state.userInfos.userToken}`
}

export const removeAuthHeaders = () => {
  delete axiosInstance.defaults.headers.Authorization
}

async function Request(type: string, path: string, payload: any): Promise<Types.AxiosSuccess | Types.AxiosError> {
  let ricevuto = false
  try {
    console.log('Axios Request', path, type)
    let response: AxiosResponse
    if (type === 'post' || type === 'put' || type === 'patch') {
      response = await axiosInstance[type](path, payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': UserStore.state.x_auth_token
        }
      })
      ricevuto = true
      // console.log('Request Response: ', response)
      // console.log(new Types.AxiosSuccess(response.data, response.status))

      const setAuthToken = (path === '/updatepwd')

      // console.log('--------- 0 ')

      if (response && (response.status === 200)) {
        let x_auth_token = ''
        try {
          if (setAuthToken || (path === '/users/login')) {
            x_auth_token = String(response.headers['x-auth'])

            if (x_auth_token === '') {
              UserStore.mutations.setServerCode(tools.ERR_AUTHENTICATION)
            }
            if (setAuthToken) {
              UserStore.mutations.UpdatePwd(x_auth_token)
              localStorage.setItem(tools.localStorage.token, x_auth_token)
            }

            UserStore.mutations.setAuth(x_auth_token)
            localStorage.setItem(tools.localStorage.token, x_auth_token)
          }

          GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')
          UserStore.mutations.setServerCode(tools.OK)
        } catch (e) {
          if (setAuthToken) {
            UserStore.mutations.setServerCode(tools.ERR_AUTHENTICATION)
            UserStore.mutations.setAuth('')
          }
          GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')
          return Promise.reject(new Types.AxiosError(serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN, null, tools.ERR_AUTHENTICATION))
        }
      }

      return new Types.AxiosSuccess(response.data, response.status)
    } else if (type === 'get' || type === 'delete') {
      // @ts-ignore
      response = await axiosInstance[type](path, {
        params: payload,
        headers: {
          'Content-Type': 'application/json',
          'x-auth': UserStore.state.x_auth_token
        }
      })
      ricevuto = true
      return new Types.AxiosSuccess(response.data, response.status)
    } else if (type === 'postFormData') {
      response = await axiosInstance.post(path, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth': UserStore.state.x_auth_token
        }
      })
      ricevuto = true
      return new Types.AxiosSuccess(response.data, response.status)
    }
  }
  catch (error) {
    setTimeout(() => {
      GlobalStore.state.connData.uploading_server = (GlobalStore.state.connData.uploading_server === 1) ? -1 : GlobalStore.state.connData.uploading_server
      GlobalStore.state.connData.downloading_server = (GlobalStore.state.connData.downloading_server === 1) ? -1 : GlobalStore.state.connData.downloading_server
    }, 1000)

    if (process.env.DEV) {
      console.log('ERROR using', path)
      // console.log('Error received: ', error)
      // console.log('ricevuto=', ricevuto)
      console.log('error.response=', error.response)
    }
    let mycode = 0
    if (!ricevuto) {
      mycode = tools.ERR_SERVERFETCH
      UserStore.mutations.setServerCode(tools.ERR_SERVERFETCH)
    } else {
      mycode = tools.ERR_GENERICO
      UserStore.mutations.setServerCode(tools.ERR_GENERICO)
    }

    if (error.response) {
      if (error.response.data && error.response.data.code) {
        mycode = error.response.data.code
        UserStore.mutations.setServerCode(mycode)
      }
      return Promise.reject(new Types.AxiosError(error.response.status, error.response.data, error.response.data.code))
    } else {
      return Promise.reject(new Types.AxiosError(0, null, mycode, error))
    }
  }
}

export default Request
