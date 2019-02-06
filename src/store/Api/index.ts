import Request from './Instance'
import sendRequest from './Inst-Pao'

export * from './ApiTypes'
import axios from 'axios'

export { addAuthHeaders, removeAuthHeaders, API_URL } from './Instance'
// import {AlgoliaSearch} from './AlgoliaController'
import Paths from '@paths'
import { rescodes } from '@src/store/Modules/rescodes'

import { UserStore } from '@modules'


// const algoliaApi = new AlgoliaSearch()
export namespace ApiTool {
  export async function post(path: string, payload?: any) {
    return await Request('post', path, payload)
  }

  export async function postFormData(path: string, payload?: any) {
    return await Request('postFormData', path, payload)
  }

  export async function get(path: string, payload?: any) {
    return await Request('get', path, payload)
  }

  export async function put(path: string, payload?: any) {
    return await Request('put', path, payload)
  }

  export async function Delete(path: string, payload: any) {
    return await Request('delete', path, payload)
  }

  export async function checkSession({ token, refresh_token }) {
    return await axios.post(process.env.API_URL + Paths.TOKEN_REFRESH, {
      refresh_token
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  export async function SendReq(url: string, lang: string, mytok: string, method: string, mydata: any, noAuth: boolean = false) {
    UserStore.mutations.setServerCode(rescodes.EMPTY)
    UserStore.mutations.setAuth('')
    return await new Promise(function (resolve, reject) {
      let ricevuto = false
      sendRequest(url, lang, mytok, method, mydata)
        .then(resreceived => {
          ricevuto = true
          let res = resreceived
          console.log('SendReq RES=', res)
          let x_auth_token = ''
          if (res.status === 200) {
            try {
              if (!noAuth) {
                x_auth_token = String(res.headers.get('x-auth'))

                if (url === process.env.MONGODB_HOST + '/updatepwd') {
                  UserStore.mutations.UpdatePwd({ idToken: x_auth_token })
                  localStorage.setItem(rescodes.localStorage.token, x_auth_token)
                }

                if (x_auth_token === '') {
                  UserStore.mutations.setServerCode(rescodes.ERR_AUTHENTICATION)
                }
              }

              UserStore.mutations.setServerCode(rescodes.OK)
              UserStore.mutations.setAuth(x_auth_token)
            } catch (e) {
              if (!noAuth) {
                UserStore.mutations.setServerCode(rescodes.ERR_AUTHENTICATION)
                UserStore.mutations.setAuth(x_auth_token)
              }
              return reject(e)
            }

            return res.json()
              .then((body) => {
                return resolve({res, body})
              })
              .catch(e => {
                UserStore.mutations.setServerCode(rescodes.ERR_GENERICO)
                return reject(e)
              })

          } else {
            return resolve({res, body: res.body})
          }
        })
        .catch(error => {
          if (process.env.DEV) {
            console.log('ERROR using', url, error, 'ricevuto=', ricevuto)
          }
          if (!ricevuto) {
            UserStore.mutations.setServerCode(rescodes.ERR_SERVERFETCH)
          } else {
            UserStore.mutations.setServerCode(rescodes.ERR_GENERICO)
          }
          return reject(error)
        })
    })
  }


}
export default ApiTool
