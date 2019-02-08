import dotenv from 'dotenv'

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`
    break
  case 'development':
    path = `${__dirname}/../../.env.development`
    break
  default:
    path = `${__dirname}/../../.env.production`
}
dotenv.config({ path })

console.log('path', path)
console.log('process.env.APP_ID', process.env.APP_ID)


export const APP_ID = process.env.APP_ID
export const LOG_LEVEL = process.env.LOG_LEVEL
