import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosInterceptorManager } from 'axios'

async function sendRequest (url: string, lang: string, mytok: string, method: string, mydata: any) {
  console.log('LANG ' + lang)
  // let mytok: string = this.getTok()
  const authHeader = new Headers()

  authHeader.append('content-type', 'application/json')
  authHeader.append('x-auth', mytok)
  authHeader.append('accept-language', lang)
  const configInit: RequestInit = {
    method: method,
    cache: 'no-cache',
    body: JSON.stringify(mydata),
    headers: authHeader
  }

  const request: Promise<Response> = fetch(url, configInit)
  return request

}

export default sendRequest
