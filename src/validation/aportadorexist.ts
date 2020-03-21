import { default as Axios, AxiosResponse } from 'axios'
// import { IPayload } from 'model'
import { GlobalConfig, PayloadMessageTypes } from '../common'
import { tools } from '../store/Modules/tools'

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/users/'

export function aportadorexist(userName: string) {
  if (userName === tools.APORTADOR_NONE)
    return true

  let onSuccess = (res: AxiosResponse) => {
    // console.log('res.status', res.status)
    return res.status === PayloadMessageTypes.statusfound
  }

  return Axios.get(VALIDATE_USER_URL + process.env.APP_ID + '/' + userName)
    .then(onSuccess)
    .catch((err) => {
      // console.log('err', err)
      return false
    })

}
