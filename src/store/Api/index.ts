import Request from './Instance'
import sendRequest from './Inst-Pao'

export * from './ApiTypes'
import axios from 'axios'

export { addAuthHeaders, removeAuthHeaders, API_URL } from './Instance'
// import {AlgoliaSearch} from './AlgoliaController'
import Paths from '@paths'
import { tools } from '@src/store/Modules/tools'

import { GlobalStore, Projects, UserStore } from '@modules'
import globalroutines from './../../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import router from '@router'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'
import * as ApiTables from '@src/store/Modules/ApiTables'

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

    mydata = {
      ...mydata,
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID
    }

    // console.log('mydata', mydata)

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

          if (!!res.status) {
            UserStore.mutations.setResStatus(res.status)
            if (res.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
              // Forbidden
              // You probably is connectiong with other page...
              UserStore.mutations.setServerCode(tools.ERR_AUTHENTICATION)
              UserStore.mutations.setAuth('')
              router.push('/signin')
              return reject({ code: tools.ERR_AUTHENTICATION })
            }
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

  function ReceiveResponsefromServer(tablesync, nametab, method, risdata) {
    // console.log('ReceiveResponsefromServer', nametab, method, risdata)
    if (!!risdata) {
      // Updated somw data after Server arrived data.
      if (method === 'PATCH') {
        if (nametab === 'projects') {
          if (!!risdata.projectris) {
            const copyrec = tools.jsonCopy(risdata.projectris)
            Projects.mutations.updateProject({ objproj: copyrec })
          }
        }
      }
    }
  }

  export async function syncAlternative(mystrparam) {
    // console.log('[ALTERNATIVE Background syncing', mystrparam)

    const multiparams = mystrparam.split('|')
    if (multiparams) {
      if (multiparams.length > 3) {
        const cmd = multiparams[0]
        const tablesync = multiparams[1]
        const nametab = multiparams[2]
        const method = multiparams[3]
        // const token = multiparams[3]

        if (cmd === ApiTables.DB.CMD_SYNC) {
          let errorfromserver = false
          let lettoqualcosa = false

          // console.log('A1) INIZIO.............................................................')
          return globalroutines(null, 'readall', tablesync, null)
            .then((alldata) => {
              const myrecs = [...alldata]

              const promises = myrecs.map((rec) => {
                let link = '/' + ApiTables.getLinkByTableName(nametab)


                if (method !== 'POST') {
                  link += '/' + rec._id
                }

                // console.log('----------------------- LEGGO QUALCOSA ', link)

                // Insert/Delete/Update table to the server
                return SendReq(link, method, rec)
                  .then((ris) => {
                    ReceiveResponsefromServer(tablesync, nametab, method, ris.data)
                    lettoqualcosa = true
                    return globalroutines(null, 'delete', tablesync, null, rec._id)
                  })
                  .then(() => {
                    return globalroutines(null, 'delete', 'swmsg', null, mystrparam)
                  })
                  .catch((err) => {
                    if (!!err.msgerr) {
                      if (err.msgerr.message.includes('Failed to fetch') || err.msgerr.message.includes('Network Error')) {
                        errorfromserver = true
                      }
                    }
                    console.log(' [Alternative] !!!!!!!!!!!!!!!   Error while sending data', err, errorfromserver, 'lettoqualcosa', lettoqualcosa)
                  })
              })

              // CALL ALL THE PROMISES
              return Promise.all(promises).then(() => {
                return (errorfromserver && !lettoqualcosa)
              }).catch((err) => {
                return (errorfromserver && !lettoqualcosa)
              })

            }).catch((e) => {
              return (errorfromserver && !lettoqualcosa)
            })
            .then((error) => {
              console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨  errorfromserver:', errorfromserver, error)
              const mystate = (error || errorfromserver) ? 'offline' : 'online'
              GlobalStore.mutations.setStateConnection(mystate)
              GlobalStore.mutations.saveConfig( { _id: costanti.CONFIG_ID_STATE_CONN, value: mystate })

            })
        }
      }
    }
  }
}
export default ApiTool
