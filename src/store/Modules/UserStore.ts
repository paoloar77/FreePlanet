import Api from '@api'
import { ISignupOptions, ISigninOptions, IUserState } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from './Store/Store'
import router from '@router'

import { serv_constants } from '../Modules/serv_constants'
import { rescodes } from '../Modules/rescodes'
import { GlobalStore, UserStore, Todos } from '@store'
import globalroutines from './../../globalroutines/index'

import translate from './../../globalroutines/util'

const bcrypt = require('bcryptjs')

// State
const state: IUserState = {
  userId: '',
  email: '',
  username: '',
  idapp: process.env.APP_ID,
  password: '',
  lang: '',
  repeatPassword: '',
  tokens: [],
  verified_email: false,
  categorySel: 'personal',
  servercode: 0,
  x_auth_token: ''
}


const b = storeBuilder.module<IUserState>('UserModule', state)
const stateGetter = b.state()

namespace Getters {

  const lang = b.read(state => {
    if (state.lang !== '') {
      return state.lang
    } else {
      return process.env.LANG_DEFAULT
    }
  }, 'lang')

  // const tok = b.read(state => {
  //   if (state.tokens) {
  //     if (typeof state.tokens[0] !== 'undefined') {
  //       return state.tokens[0].token
  //     } else {
  //       return ''
  //     }
  //   } else {
  //     return ''
  //   }
  // }, 'tok')

  const isServerError = b.read(state => {
    return (state.servercode === rescodes.ERR_SERVERFETCH)
  }, 'isServerError')

  const getServerCode = b.read(state => {
    return state.servercode
  }, 'getServerCode')

  export const getters = {
    get lang() {
      return lang()
    },
    // get tok() {
    //   return tok()
    // },
    get isServerError() {
      return isServerError()
    },
    get getServerCode() {
      return getServerCode()
    }
  }


}


namespace Mutations {
  function authUser(state, data: IUserState) {
    state.userId = data.userId
    state.username = data.username
    state.verified_email = data.verified_email
    state.category = data.categorySel
    resetArrToken(state.tokens)
    state.tokens.push({ access: 'auth', token: state.x_auth_token, date_login: new Date() })
    // console.log('state.tokens', state.tokens)
  }

  function setpassword(state: IUserState, newstr: string) {
    state.password = newstr
  }

  function setemail(state: IUserState, newstr: string) {
    state.email = newstr
  }

  function setlang(state: IUserState, newstr: string) {
    state.lang = newstr
    localStorage.setItem('lang', state.lang)
  }

  function UpdatePwd(state: IUserState, data: IIdToken) {
    state.x_auth_token = data.x_auth_token
    if (!state.tokens) {
      state.tokens = []
    }
    state.tokens.push({ access: 'auth', token: data.x_auth_token, data_login: new Date() })
  }

  function setServerCode(state: IUserState, num: number) {
    state.servercode = num
  }

  function setResStatus(state: IUserState, status: number) {
    state.resStatus = status
  }

  function setAuth(state: IUserState, x_auth_token: string) {

    state.x_auth_token = x_auth_token
  }


  function resetArrToken(arrtokens) {
    if (!arrtokens.tokens) {
      arrtokens.tokens = []
    }

    // Take only the others access (from others Browser)
    return arrtokens.filter((token: IToken) => {
      return token.access !== 'auth'
    })
  }

  function clearAuthData(state: IUserState) {
    state.userId = ''
    state.username = ''
    resetArrToken(state.tokens)
    state.x_auth_token = ''
    state.verified_email = false
    state.categorySel = 'personal'
  }


  function setErrorCatch(state: IUserState, err: number) {
    if (state.servercode !== rescodes.ERR_SERVERFETCH) {
      state.servercode = err
    }
    console.log('Err catch: (servercode:', err, ')')
  }

  function getMsgError(state: IUserState, err: number) {
    let msgerrore = ''
    if (err !== rescodes.OK) {
      msgerrore = 'Error [' + state.servercode + ']: '
      if (state.servercode === rescodes.ERR_SERVERFETCH) {
        msgerrore = translate('fetch.errore_server')
      } else {
        msgerrore = translate('fetch.errore_generico')
      }

      if (process.env.DEV) {
        console.log('ERROREEEEEEEEE: ', msgerrore, ' (', err, ')')
      }
    }

    // return { code: state.servercode, msg: msgerrore }
    return msgerrore
  }


  export const mutations = {
    authUser: b.commit(authUser),
    setpassword: b.commit(setpassword),
    setemail: b.commit(setemail),
    setlang: b.commit(setlang),
    UpdatePwd: b.commit(UpdatePwd),
    setServerCode: b.commit(setServerCode),
    setResStatus: b.commit(setResStatus),
    setAuth: b.commit(setAuth),
    clearAuthData: b.commit(clearAuthData),
    setErrorCatch: b.commit(setErrorCatch),
    getMsgError: b.commit(getMsgError)
  }


}

namespace Actions {

  async function sendUserEdit(context, form: Object) {
    try {
      const { data } = await Api.postFormData('profile/edit', form)
      console.log(data)
      // return new ApiSuccess({data})

    } catch {
      // return new ApiError()
    }
  }

  async function resetpwd(context, paramquery: IUserState) {
    let call = process.env.MONGODB_HOST + '/updatepwd'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      email: paramquery.email,
      password: paramquery.password,
      tokenforgot: paramquery.tokenforgot
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    return await Api.SendReq(call, 'POST', usertosend, true)
      .then(({ res, body }) => {
        return { code: body.code, msg: body.msg }
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return { code: UserStore.getters.getServerCode, msg: error }
      })

  }

  async function requestpwd(context, paramquery: IUserState) {

    let call = process.env.MONGODB_HOST + '/requestnewpwd'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      email: paramquery.email
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    return await Api.SendReq(call, 'POST', usertosend)
      .then(({ res, body }) => {
        return { code: body.code, msg: body.msg }
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

  }

  async function vreg(context, paramquery: ILinkReg) {
    let call = process.env.MONGODB_HOST + '/vreg'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      idlink: paramquery.idlink
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    return await Api.SendReq(call, 'POST', usertosend)
      .then(({ res, body }) => {
        // console.log("RITORNO 2 ");
        // mutations.setServerCode(myres);
        if (body.code === serv_constants.RIS_CODE_EMAIL_VERIFIED) {
          console.log('VERIFICATO !!')
          localStorage.setItem(rescodes.localStorage.verified_email, String(true))
        } else {
          console.log('Risultato di vreg: ', body.code)
        }
        return { code: body.code, msg: body.msg }
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })
  }

  async function signup(context, authData: ISignupOptions) {
    let call = process.env.MONGODB_HOST + '/users'
    console.log('CALL ' + call)

    // console.log("PASSW: " + authData.password);

    let mylang = state.lang
    console.log('MYLANG: ' + mylang)

    return bcrypt.hash(authData.password, bcrypt.genSaltSync(12))
      .then((hashedPassword: string) => {
        let usertosend = {
          keyappid: process.env.PAO_APP_ID,
          lang: mylang,
          email: authData.email,
          password: String(hashedPassword),
          username: authData.username,
          idapp: process.env.APP_ID
        }

        console.log(usertosend)

        let myres: IResult

        Mutations.mutations.setServerCode(rescodes.CALLING)

        return Api.SendReq(call, 'POST', usertosend)
          .then(({ res, body }) => {
            myres = res

            const newuser = body

            console.log('newuser', newuser)

            Mutations.mutations.setServerCode(myres.status)

            if (myres.status === 200) {
              let userId = newuser._id
              let username = authData.username
              if (process.env.DEV) {
                console.log('USERNAME = ' + username)
                console.log('IDUSER= ' + userId)
              }

              Mutations.mutations.authUser({
                userId,
                username,
                verified_email: false
              })

              const now = new Date()
              // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
              const expirationDate = new Date(now.getTime() * 1000)
              localStorage.setItem(rescodes.localStorage.userId, userId)
              localStorage.setItem(rescodes.localStorage.username, username)
              localStorage.setItem(rescodes.localStorage.token, state.x_auth_token)
              localStorage.setItem(rescodes.localStorage.expirationDate, expirationDate.toString())
              localStorage.setItem(rescodes.localStorage.verified_email, String(false))
              state.isLogged = true
              // dispatch('storeUser', authData);
              // dispatch('setLogoutTimer', myres.data.expiresIn);

              return rescodes.OK
            } else {
              return rescodes.ERR_GENERICO
            }
          })
          .catch((error) => {
            UserStore.mutations.setErrorCatch(error)
            return UserStore.getters.getServerCode
          })
      })
  }

  async function signin(context, authData: ISigninOptions) {
    let call = process.env.MONGODB_HOST + '/users/login'
    console.log('LOGIN ' + call)

    console.log('MYLANG = ' + state.lang)

    let sub = null

    if ('serviceWorker' in navigator) {
      sub = await navigator.serviceWorker.ready
        .then(function (swreg) {
          let sub = swreg.pushManager.getSubscription()
          return sub
        })
        .catch(e => {
          sub = null
        })
    }

    const options = {
      title: translate('notification.title_subscribed'),
      content: translate('notification.subscribed'),
      openUrl: '/'
    }

    const usertosend = {
      username: authData.username,
      password: authData.password,
      idapp: process.env.APP_ID,
      keyappid: process.env.PAO_APP_ID,
      lang: state.lang,
      subs: sub,
      options
    }

    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    let myres: IResult

    return Api.SendReq(call, 'POST', usertosend, true)
      .then(({ res, body }) => {
        myres = res

        if (body.code === serv_constants.RIS_CODE_LOGIN_ERR) {
          Mutations.mutations.setServerCode(body.code)
          return { myres, body }
        }

        Mutations.mutations.setServerCode(myres.status)

        if (myres.status !== 200) {
          return Promise.reject(rescodes.ERR_GENERICO)
        }
        return { myres, body }

      }).then(({ myres, body }) => {

        if (myres.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
          if (process.env.DEV) {
            console.log('CODE = ' + body.code)
          }
          return body.code
        } else if (myres.status !== 200) {
          if (process.env.DEV) {
            console.log('CODE = ' + body.code)
          }
          return body.code
        }

        if (myres.status === 200) {
          GlobalStore.mutations.SetwasAlreadySubOnDb(body.subsExistonDb)

          let myuser: IUserState = body.usertosend
          if (myuser) {
            let userId = myuser.userId
            let username = authData.username
            let verified_email = myuser.verified_email
            if (process.env.DEV) {
              console.log('USERNAME = ' + username, 'IDUSER= ' + userId)
              // console.log('state.x_auth_token= ' + state.x_auth_token)
            }

            Mutations.mutations.authUser({
              userId,
              username,
              verified_email
            })

            const now = new Date()
            // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
            const expirationDate = new Date(now.getTime() * 1000)
            localStorage.setItem(rescodes.localStorage.userId, userId)
            localStorage.setItem(rescodes.localStorage.username, username)
            localStorage.setItem(rescodes.localStorage.token, state.x_auth_token)
            localStorage.setItem(rescodes.localStorage.expirationDate, expirationDate.toString())
            localStorage.setItem(rescodes.localStorage.isLogged, String(true))
            localStorage.setItem(rescodes.localStorage.verified_email, String(verified_email))
            localStorage.setItem(rescodes.localStorage.wasAlreadySubOnDb, String(GlobalStore.state.wasAlreadySubOnDb))

          }
        }

        return rescodes.OK

      }).then(code => {
        if (code === rescodes.OK) {
          return setGlobal(true)
            .then(() => {
              return code
            })
        } else {
          return code
        }
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })
  }

  async function logout(context) {
    console.log('logout')

    localStorage.removeItem(rescodes.localStorage.expirationDate)
    localStorage.removeItem(rescodes.localStorage.token)
    localStorage.removeItem(rescodes.localStorage.userId)
    localStorage.removeItem(rescodes.localStorage.username)
    localStorage.removeItem(rescodes.localStorage.isLogged)
    // localStorage.removeItem(rescodes.localStorage.leftDrawerOpen)
    localStorage.removeItem(rescodes.localStorage.verified_email)
    localStorage.removeItem(rescodes.localStorage.categorySel)
    localStorage.removeItem(rescodes.localStorage.wasAlreadySubOnDb)


    await GlobalStore.actions.clearDataAfterLogout()

    let call = process.env.MONGODB_HOST + '/users/me/token'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID
    }

    console.log(usertosend)
    const riscall = await Api.SendReq(call, 'DELETE', usertosend)
      .then(({ res, body }) => {
        console.log(res)
      }).then(() => {
        Mutations.mutations.clearAuthData()
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return riscall

    // this.$router.push('/signin')
  }

  async function setGlobal(loggedWithNetwork: boolean) {
    state.isLogged = true
    GlobalStore.mutations.setleftDrawerOpen(localStorage.getItem(rescodes.localStorage.leftDrawerOpen) === 'true')
    GlobalStore.mutations.setCategorySel(localStorage.getItem(rescodes.localStorage.categorySel))


    await GlobalStore.actions.loadAfterLogin()
      .then(() => {
        Todos.actions.dbLoadTodo(true)
      })
  }


  async function autologin_FromLocalStorage(context) {
    try {
      // console.log('*** autologin_FromLocalStorage ***')
      // INIT

      UserStore.mutations.setlang(process.env.LANG_DEFAULT)
      // Estrai la Lang dal Localstorage
      const lang = localStorage.getItem('lang')
      if (lang) {
        UserStore.mutations.setlang(lang)
      }

      const token = localStorage.getItem(rescodes.localStorage.token)
      if (!token) {
        return false
      }
      const expirationDateStr = localStorage.getItem(rescodes.localStorage.expirationDate)
      let expirationDate = new Date(String(expirationDateStr))
      const now = new Date()
      if (now >= expirationDate) {
        console.log('!!! Login Expired')
        return false
      }
      const userId = String(localStorage.getItem(rescodes.localStorage.userId))
      const username = String(localStorage.getItem(rescodes.localStorage.username))
      const verified_email = localStorage.getItem(rescodes.localStorage.verified_email) === 'true'

      GlobalStore.state.wasAlreadySubOnDb = localStorage.getItem(rescodes.localStorage.wasAlreadySubOnDb) === 'true'

      console.log('*************  autologin userId', userId)

      UserStore.mutations.setAuth(token)

      Mutations.mutations.authUser({
        userId,
        username,
        verified_email
      })

      await setGlobal(false)

      console.log('autologin userId STATE ', state.userId)

      return true
    } catch (e) {
      console.error('ERR autologin ', e.message)
      return false
    }
  }


  export const actions = {
    resetpwd: b.dispatch(resetpwd),
    requestpwd: b.dispatch(requestpwd),
    vreg: b.dispatch(vreg),
    signup: b.dispatch(signup),
    signin: b.dispatch(signin),
    logout: b.dispatch(logout),
    autologin_FromLocalStorage: b.dispatch(autologin_FromLocalStorage)

  }
}

// Module
const UserModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}

export default UserModule
