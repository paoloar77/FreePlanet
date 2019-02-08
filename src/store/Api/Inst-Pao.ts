import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosInterceptorManager } from 'axios'

async function sendRequest(url: string, lang: string, mytok: string, method: string, mydata: any) {

  console.log('sendRequest', method, url, '[', lang, ']')

  const authHeader = new Headers()
  authHeader.append('content-Type', 'application/json')
  authHeader.append('Accept', 'application/json')
  authHeader.append('x-auth', mytok)
  // authHeader.append('accept-language', lang)

  let configInit: RequestInit

  if (method === 'GET') {
    configInit = {
      method: method,
      cache: 'no-cache',
      headers: authHeader
    }
  } else if (method === 'DELETE') {
    configInit = {
      method: method,
      cache: 'no-cache',
      headers: authHeader
    }
  } else {
    configInit = {
      method: method,
      cache: 'no-cache',
      body: JSON.stringify(mydata),
      headers: authHeader
    }
  }

  const request: Promise<Response> = fetch(url, configInit)
  return request

}

export default sendRequest
