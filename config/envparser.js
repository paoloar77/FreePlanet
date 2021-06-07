const DotEnv = require('dotenv')

let path
switch (process.env.NODE_ENV) {
  case 'test':
    path = `.env.test`
    break
  case 'development':
    path = `.env.development`
    break
  default:
    path = `.env.production`
    break
}

// console.log("PATH", path)
const parsedEnv = DotEnv.config({ path }).parsed;

module.exports = function () {
  // Let's stringify our variables
  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }
  return parsedEnv
};
