import Request from './Instance'
import sendRequest from './Inst-Pao'

export * from './ApiTypes'
import axios from 'axios'

export { addAuthHeaders, removeAuthHeaders, API_URL } from './Instance'
// import {AlgoliaSearch} from './AlgoliaController'
import Paths from '@paths'
import { tools } from '@src/store/Modules/tools'

import { GlobalStore, UserStore } from '@modules'
import globalroutines from './../../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import router from '@router'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'

// const algoliaApi = new AlgoliaSearch()
export namespace ApiTool {
  export async function post(path: string, payload?: any) {
    GlobalStore.state.connData.downloading_server = 1
    GlobalStore.state.connData.uploading_server = 1
    return await Request('post', path, payload)
  }

  export async function postFormData(path: string, payload?: any) {
    GlobalStore.state.connData.uploading_server = 1
    GlobalStore.state.connData.downloading_server = 1
    return await Request('postFormData', path, payload)
  }

  export async function get(path: string, payload?: any) {
    GlobalStore.state.connData.downloading_server = 1
    GlobalStore.state.connData.uploading_server = 0
    return await Request('get', path, payload)
  }

  export async function put(path: string, payload?: any) {
    GlobalStore.state.connData.uploading_server = 1
    return await Request('put', path, payload)
  }

  export async function patch(path: string, payload?: any) {
    GlobalStore.state.connData.uploading_server = 1
    return await Request('patch', path, payload)
  }

  export async function Delete(path: string, payload: any) {
    GlobalStore.state.connData.uploading_server = 1
    return await Request('delete', path, payload)
  }

  export async function checkSession({ token, refresh_token }) {
    return await axios.post(process.env.API_URL + Paths.TOKEN_REFRESH, {
      refresh_token
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  export async function SendReq(url: string, method: string, mydata: any, setAuthToken: boolean = false): Promise<Types.AxiosSuccess | Types.AxiosError> {
    UserStore.mutations.setServerCode(tools.EMPTY)
    UserStore.mutations.setResStatus(0)
    return await new Promise((resolve, reject) =>  {

      return sendRequest(url, method, mydata)
        .then((res) => {
          // console.log('res', res)

          setTimeout(() => {
            if (method === 'get') {
              GlobalStore.state.connData.downloading_server = 0
            }
            else {
              GlobalStore.state.connData.uploading_server = 0
              GlobalStore.state.connData.downloading_server = 0
            }
          }, 1000)

          UserStore.mutations.setResStatus(res.status)
          if (res.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
            // Forbidden
            // You probably is connectiong with other page...
            UserStore.mutations.setServerCode(tools.ERR_AUTHENTICATION)
            UserStore.mutations.setAuth('')
            router.push('/signin')
            return reject({ code: tools.ERR_AUTHENTICATION })
          }

          return resolve(res)

        })
        .catch((error) => {
          setTimeout(() => {
            if (method === 'get') {
              GlobalStore.state.connData.downloading_server = -1
            }
            else {
              GlobalStore.state.connData.uploading_server = -1
              GlobalStore.state.connData.downloading_server = -1
            }
          }, 1000)

          console.log('error', error)
          return reject(error)
        })
    })
  }

  export async function syncAlternative(mystrparam) {
    // console.log('[ALTERNATIVE Background syncing', mystrparam)

    const multiparams = mystrparam.split('|')
    if (multiparams) {
      if (multiparams.length > 3) {
        const cmd = multiparams[0]
        const table = multiparams[1]
        const method = multiparams[2]
        const token = multiparams[3]
        // let lang = multiparams[3]

        if (cmd === 'sync-todos') {
          // console.log('[Alternative] Syncing', cmd, table, method)

          // const headers = new Headers()
          // headers.append('content-Type', 'application/json')
          // headers.append('Accept', 'application/json')
          // headers.append('x-auth', token)

          let errorfromserver = false
          let lettoqualcosa = false

          // console.log('A1) INIZIO.............................................................')
          return globalroutines(null, 'readall', table, null)
            .then((alldata) => {
              const myrecs = [...alldata]
              // console.log('----------------------- LEGGO QUALCOSA ')

              const promises = myrecs.map((rec) => {
                // console.log('syncing', table, '', rec.descr)
                // let link = String(process.env.MONGODB_HOST) + '/todos'
                let link = '/todos'

                if (method !== 'POST') {
                  link += '/' + rec._id
                }

                // console.log(' [Alternative] ++++++++++++++++++ SYNCING !!!!  ', rec.descr, table, 'FETCH: ', method, link, 'data:')

                // Insert/Delete/Update table to the server
                return SendReq(link, method, rec)
                // return fetch(link, {
                //   method: method,
                //   headers: headers,
                //   cache: 'no-cache',
                //   mode: 'cors',   // 'no-cors',
                //   body: JSON.stringify(rec)
                // })
                  .then(() => {
                    lettoqualcosa = true
                    return globalroutines(null, 'delete', table, null, rec._id)
                  })
                  .then(() => {
                    return globalroutines(null, 'delete', 'swmsg', null, mystrparam)
                  })
                  .catch((err) => {
                    if (err.message === 'Failed to fetch') {
                      errorfromserver = true
                    }
                    // console.log(' [Alternative] !!!!!!!!!!!!!!!   Error while sending data', err, errorfromserver, 'lettoqualcosa', lettoqualcosa)
                  })
              })

              // CALL ALL THE PROMISES
              return Promise.all(promises).then(() => {
                return (errorfromserver && !lettoqualcosa)
              }).catch((err) => {
                return (errorfromserver && !lettoqualcosa)
              })

            }).catch((e) => {
              // console.log('ERROR:', e)
              return (errorfromserver && !lettoqualcosa)
            })
            .then((errorfromserver) => {
              // console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨  errorfromserver:', errorfromserver)
              const mystate = errorfromserver ? 'offline' : 'online'
              GlobalStore.mutations.setStateConnection(mystate)
              GlobalStore.mutations.saveConfig( { _id: costanti.CONFIG_ID_STATE_CONN, value: mystate })

            })

          // console.log(' [Alternative] A2) ?????????????????????????? ESCO DAL LOOP !!!!!!!!!')

        }
      }
    }
  }

}
export default ApiTool
