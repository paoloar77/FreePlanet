import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getCookie() {
  return Cookies.get(TokenKey)
}

export function setCookie(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeCookie() {
  return Cookies.remove(TokenKey)
}
