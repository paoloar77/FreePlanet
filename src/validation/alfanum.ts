export function alfanum(username: string) {
  let code, i, len

  for (i = 0, len = username.length; i < len; i++) {
    code = username.charCodeAt(i)
    if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false
    }
  }
  return true
}
