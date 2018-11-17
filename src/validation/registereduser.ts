import { default as Axios, AxiosResponse } from 'axios'
import { IPayload } from 'model'
import { GlobalConfig, PayloadMessageTypes } from '../common'

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/users/'

export function registereduser(userName: string) {

  let config = {
    params: { userName: userName }
  }

  let onSuccess = (res: AxiosResponse) => {
    return res.status !== PayloadMessageTypes.statusfound
  }

  return Axios.get(VALIDATE_USER_URL + config.params.userName)
    .then(onSuccess)
    .catch((err) => {
      return true
    })

}
