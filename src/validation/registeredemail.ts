import { default as Axios, AxiosResponse } from 'axios'
import { GlobalConfig, PayloadMessageTypes } from '../common'

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/email/'

export function registeredemail(email: string) {

  let onSuccess = (res: AxiosResponse) => {
    return res.status !== PayloadMessageTypes.statusfound
  }

  return Axios.get(VALIDATE_USER_URL + email)
    .then(onSuccess)
    .catch((err) => {
      return true
    })

}
