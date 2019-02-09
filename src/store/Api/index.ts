import Request from './Instance'
import sendRequest from './Inst-Pao'

export * from './ApiTypes'
import axios from 'axios'

export { addAuthHeaders, removeAuthHeaders, API_URL } from './Instance'
// import {AlgoliaSearch} from './AlgoliaController'
import Paths from '@paths'
import { rescodes } from '@src/store/Modules/rescodes'

import { GlobalStore, UserStore } from '@modules'
import globalroutines from './../../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import router from '@router'


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

  export async function SendReq(url: string, lang: string, mytok: string, method: string, mydata: any, setAuthToken: boolean = false) {
    UserStore.mutations.setServerCode(rescodes.EMPTY)
    UserStore.mutations.setResStatus(0)
    UserStore.mutations.setAuth('')
    return await new Promise(function (resolve, reject) {
      let ricevuto = false

      return sendRequest(url, lang, mytok, method, mydata)
        .then(resreceived => {
          console.log('resreceived', resreceived)
          ricevuto = true
          let res = resreceived.clone()
          if (process.env.DEV) {
            console.log('SendReq RES [', res.status, ']', res)
          }

          UserStore.mutations.setResStatus(res.status)
          if (res.status === 200) {
            let x_auth_token = ''
            try {
              if (setAuthToken) {
                x_auth_token = String(res.headers.get('x-auth'))

                if (x_auth_token === '') {
                  UserStore.mutations.setServerCode(rescodes.ERR_AUTHENTICATION)
                }
                UserStore.mutations.setAuth(x_auth_token)

                if (url === process.env.MONGODB_HOST + '/updatepwd') {
                  UserStore.mutations.UpdatePwd({ idToken: x_auth_token })
                  localStorage.setItem(rescodes.localStorage.token, x_auth_token)
                }
              }

              UserStore.mutations.setServerCode(rescodes.OK)
            } catch (e) {
              if (setAuthToken) {
                UserStore.mutations.setServerCode(rescodes.ERR_AUTHENTICATION)
                UserStore.mutations.setAuth('')
              }
              GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')
              return reject({ code: rescodes.ERR_AUTHENTICATION, status: res.status })
            }
          } else if (res.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
            // Forbidden
            // You probably is connectiong with other page...
            UserStore.mutations.setServerCode(rescodes.ERR_AUTHENTICATION)
            UserStore.mutations.setAuth('')
            GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')
            router.push('/signin')
            return reject({ code: rescodes.ERR_AUTHENTICATION, status: res.status })
          }

          GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')

          return res.json()
            .then((body) => {
              return resolve({ res, body })
            })
            .catch(e => {
              UserStore.mutations.setServerCode(rescodes.ERR_GENERICO)
              return reject({ code: rescodes.ERR_GENERICO, status: res.status })
            })

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

          GlobalStore.mutations.setStateConnection(ricevuto ? 'online' : 'offline')

          return reject({ code: error, status: 0 })
        })
    })
  }

  export async function syncAlternative(mystrparam) {
    console.log('[ALTERNATIVE Background syncing', mystrparam)

    let multiparams = mystrparam.split('|')
    if (multiparams) {
      if (multiparams.length > 3) {
        let cmd = multiparams[0]
        let table = multiparams[1]
        let method = multiparams[2]
        let token = multiparams[3]
        // let lang = multiparams[3]

        if (cmd === 'sync-todos') {
          console.log('[Alternative] Syncing', cmd, table, method)

          const headers = new Headers()
          headers.append('content-Type', 'application/json')
          headers.append('Accept', 'application/json')
          headers.append('x-auth', token)

          // console.log('A1) INIZIO.............................................................')
          await globalroutines(null, 'readall', table, null)
            .then(function (alldata) {
                const myrecs = [...alldata]
                // console.log('----------------------- LEGGO QUALCOSA ')
                if (myrecs) {
                  for (let rec of myrecs) {
                    // console.log('syncing', table, '', rec.descr)
                    let link = process.env.MONGODB_HOST + '/todos'

                    if (method !== 'POST')
                      link += '/' + rec._id

                    console.log(' [Alternative] ++++++++++++++++++ SYNCING !!!!  ', rec.descr, table, 'FETCH: ', method, link, 'data:')

                    let lettoqualcosa = false

                    // Insert/Delete/Update table to the server
                    return fetch(link, {
                      method: method,
                      headers: headers,
                      cache: 'no-cache',
                      mode: 'cors',   // 'no-cors',
                      body: JSON.stringify(rec)
                    }).then(resData => {
                      lettoqualcosa = true

                      console.log('Clear', table, rec._id)
                      return globalroutines(null, 'delete', table, null, rec._id)
                    })
                      .then((ris) => {
                        console.log('Clear', 'swmsg', method)
                        GlobalStore.mutations.setStateConnection(lettoqualcosa ? 'online' : 'offline')
                        // deleteItemFromData('swmsg', mystrparam)
                        return globalroutines(null, 'delete', 'swmsg', null, mystrparam)
                      })
                      .catch(function (err) {
                        console.log(' [Alternative] !!!!!!!!!!!!!!!   Error while sending data', err)
                        GlobalStore.mutations.setStateConnection(lettoqualcosa ? 'online' : 'offline')
                      })

                  }
                }
              }
            ).catch(e => {
              console.log('ERROR:', e)
            })

          console.log(' [Alternative] A2) ?????????????????????????? ESCO DAL LOOP !!!!!!!!! err=')

        }
      }
    }
  }


}
export default ApiTool
