import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosInterceptorManager } from 'axios'
import Api from '@api'
import * as Types from '@src/store/Api/ApiTypes'

async function sendRequest(url: string, method: string, mydata: any) {

  console.log('sendRequest', method, url)

  let request
  if (method === 'GET')
    request = Api.get(url, mydata)
  else if (method === 'POST')
    request = Api.post(url, mydata)
  else if (method === 'DELETE')
    request = Api.Delete(url, mydata)
  else if (method === 'PUT')
    request = Api.put(url, mydata)

  const req: Promise<Types.AxiosSuccess | Types.AxiosError> = request
  return req
}



export default sendRequest
