function objectId () {
  return hex(Date.now() / 1000) +
    ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
}

function hex (value) {
  return Math.floor(value).toString(16)
}

export default objectId
