import Api from '@api'
import { ISignupOptions, ISigninOptions, IUserState } from 'model'
import { ILinkReg, IResult, IIdToken } from 'model/other'
import { storeBuilder } from './Store/Store'
import router from '@router'

import { serv_constants } from '../Modules/serv_constants'
import { rescodes } from '../Modules/rescodes'
import { GlobalStore, UserStore, Todos } from '@store'
import globalroutines from './../../globalroutines/index'

const bcrypt = require('bcryptjs')

// State
const state: IUserState = {
  userId: '',
  email:  '',
  username: '',
  idapp: process.env.APP_ID,
  password: '',
  lang: '',
  repeatPassword: '',
  idToken: '',
  tokens: [],
  verifiedEmail: false,
  categorySel: 'personal'
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

  const tok = b.read(state => {
    if (state.tokens) {
      if (typeof state.tokens[0] !== 'undefined') {
        return state.tokens[0].token
      } else {
        return ''
      }
    } else {
      return ''
    }
  }, 'tok')

  export const getters = {
    get lang() {
      return lang()
    },
    get tok() {
      return tok()
    }
  }

}


namespace Mutations {
  function authUser(state, data: IUserState) {
    state.userId = data.userId
    state.username = data.username
    state.idToken = data.idToken
    state.verifiedEmail = data.verifiedEmail
    state.category = data.categorySel
    // @ts-ignore
    state.tokens = [
      { access: 'auth', token: data.idToken }
    ]
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
    state.idToken = data.idToken
    if (!state.tokens) {
      state.tokens = []
    }
    state.tokens.push({ access: 'auth', token: data.idToken })
  }

  function setServerCode(state: IUserState, num: number) {
    state.servercode = num
  }

  function clearAuthData(state: IUserState) {
    state.userId = ''
    state.username = ''
    state.tokens = []
    state.idToken = ''
    state.verifiedEmail = false
    state.categorySel = 'personal'
  }

  export const mutations = {
    authUser: b.commit(authUser),
    setpassword: b.commit(setpassword),
    setemail: b.commit(setemail),
    setlang: b.commit(setlang),
    UpdatePwd: b.commit(UpdatePwd),
    setServerCode: b.commit(setServerCode),
    clearAuthData: b.commit(clearAuthData)
  }

}

namespace Actions {

  async function sendUserEdit(context, form: Object) {
    try {
      const {data} = await Api.postFormData('profile/edit', form)
      console.log(data)
      // return new ApiSuccess({data})

    } catch {
      // return new ApiError()
    }
  }

  async function resetpwd (context, paramquery: IUserState) {
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

    let myres

    let x_auth_token: string = ''

    return await Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
      .then((res) => {
        console.log(res)
        myres = res
        x_auth_token = String(res.headers.get('x-auth'))
        if (myres.status === 200) {
          return myres.json()
        }
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore: ' + myres.status, resetpwd: true }

      })
      .then((body) => {
        Mutations.mutations.UpdatePwd({ idToken: x_auth_token })
        localStorage.setItem(rescodes.localStorage.token, x_auth_token)

        return { code: body.code, msg: body.msg }
      }).catch((err) => {
        console.log('ERROR: ' + err)
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore' }
      })

  }

  async function requestpwd (context, paramquery: IUserState) {

    let call = process.env.MONGODB_HOST + '/requestnewpwd'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      email: paramquery.email
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    let myres

    return await Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
      .then((res) => {
        console.log(res)
        myres = res
        if (myres.status === 200) {
          return myres.json()
        }
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore: ' + myres.status, resetpwd: true }

      })
      .then((body) => {
        return { code: body.code, msg: body.msg }
      }).catch((err) => {
        console.log('ERROR: ' + err)
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore' }
      })

  }

  async function vreg (context, paramquery: ILinkReg) {
    let call = process.env.MONGODB_HOST + '/vreg'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      idlink: paramquery.idlink
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    let myres

    return await Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
      .then((res) => {
        console.log(res)
        myres = res
        if (myres.status === 200) {
          return myres.json()
        }
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore: ' + myres.status }

      })
      .then((body) => {
        // console.log("RITORNO 2 ");
        // mutations.setServerCode(myres);
        if (body.code === serv_constants.RIS_CODE_EMAIL_VERIFIED) {
          console.log('VERIFICATO !!')
          localStorage.setItem(rescodes.localStorage.verifiedEmail, '1')
        } else {
          console.log('Risultato di vreg: ', body.code)
        }
        return { code: body.code, msg: body.msg }
      }).catch((err) => {
        console.log('ERROR: ' + err)
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return { code: rescodes.ERR_GENERICO, msg: 'Errore' }
      })
  }

  async function signup (context, authData: ISignupOptions) {
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

        let x_auth_token: string = ''

        return Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
          .then((res) => {
            myres = res
            x_auth_token = String(res.headers.get('x-auth'))
            if (x_auth_token) {
              return res.json()
            } else {
              return { status: 400, code: rescodes.ERR_GENERICO }
            }
          })
          .then((body) => {
            if (process.env.DEV) {
              console.log('RISULTATO ')
              console.log('STATUS ' + myres.status + ' ' + (myres.statusText))
              console.log('BODY:')
              console.log(body)
            }

            Mutations.mutations.setServerCode(myres.status)

            if (myres.status === 200) {
              let userId = body.userId
              let username = authData.username
              if (process.env.DEV) {
                console.log('USERNAME = ' + username)
                console.log('IDUSER= ' + userId)
              }

              Mutations.mutations.authUser({
                userId: userId,
                username: username,
                idToken: x_auth_token,
                verifiedEmail: false
              })

              const now = new Date()
              // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
              const expirationDate = new Date(now.getTime() * 1000)
              localStorage.setItem(rescodes.localStorage.userId, userId)
              localStorage.setItem(rescodes.localStorage.username, username)
              localStorage.setItem(rescodes.localStorage.token, x_auth_token)
              localStorage.setItem(rescodes.localStorage.expirationDate, expirationDate.toString())
              localStorage.setItem(rescodes.localStorage.verifiedEmail, '0')
              // dispatch('storeUser', authData);
              // dispatch('setLogoutTimer', myres.data.expiresIn);

              return rescodes.OK
            } else if (myres.status === 404) {
              if (process.env.DEV) {
                console.log('CODE = ' + body.code)
              }
              return body.code
            } else {
              if (process.env.DEV) {
                console.log('CODE = ' + body.code)
              }
              return body.code
            }
          })
          .catch((error) => {
            if (process.env.DEV) {
              console.log('signup ERROREEEEEEEEE')
              console.log(error)
            }
            Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
            return rescodes.ERR_GENERICO
          })
      })
  }

  async function signin (context, authData: ISigninOptions) {
    let call = process.env.MONGODB_HOST + '/users/login'
    console.log('LOGIN ' + call)

    console.log('MYLANG = ' + state.lang)

    const usertosend = {
      username: authData.username,
      password: authData.password,
      idapp: process.env.APP_ID,
      keyappid: process.env.PAO_APP_ID,
      lang: state.lang
    }

    console.log(usertosend)

    let myres: IResult

    Mutations.mutations.setServerCode(rescodes.CALLING)

    let x_auth_token: string = ''

    return await Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
      .then((res) => {
        myres = res
        x_auth_token = String(res.headers.get('x-auth'))
        let injson = res.json()

        if (x_auth_token || injson) {
          return injson
        } else {
          return { status: 400, code: rescodes.ERR_GENERICO }
        }
      })
      .then((body) => {
        if (process.env.DEV) {
          console.log('RISULTATO ')
          console.log('STATUS ' + myres.status + ' ' + (myres.statusText))
          console.log('BODY:')
          console.log(body)
        }

        if (body.code === serv_constants.RIS_CODE_LOGIN_ERR) {
          Mutations.mutations.setServerCode(body.code)
          return body.code
        }

        Mutations.mutations.setServerCode(myres.status)

        if (myres.status === 200) {
          let userId = body.userId
          let username = authData.username
          let verifiedEmail = body.verified_email === 'true' || body.verified_email === true
          if (process.env.DEV) {
            console.log('USERNAME = ' + username)
            console.log('IDUSER= ' + userId)
            Mutations.mutations.authUser({
              userId: userId,
              username: username,
              idToken: x_auth_token,
              verifiedEmail: verifiedEmail
            })
          }

          const now = new Date()
          // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
          const expirationDate = new Date(now.getTime() * 1000)
          localStorage.setItem(rescodes.localStorage.userId, userId)
          localStorage.setItem(rescodes.localStorage.username, username)
          localStorage.setItem(rescodes.localStorage.token, x_auth_token)
          localStorage.setItem(rescodes.localStorage.expirationDate, expirationDate.toString())
          localStorage.setItem(rescodes.localStorage.isLogged, String(true))
          localStorage.setItem(rescodes.localStorage.verifiedEmail, Number(verifiedEmail).toString())

          setGlobal()

          // dispatch('storeUser', authData);
          // dispatch('setLogoutTimer', myres.data.expiresIn);
          return rescodes.OK
        } else if (myres.status === 404) {
          if (process.env.DEV) {
            console.log('CODE = ' + body.code)
          }
          return body.code
        } else {
          if (process.env.DEV) {
            console.log('CODE = ' + body.code)
          }
          return body.code
        }
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('signin ERRORE', error)
        }
        Mutations.mutations.setServerCode(rescodes.ERR_GENERICO)
        return rescodes.ERR_GENERICO
      })
  }

  async function logout (context) {

    let call = process.env.MONGODB_HOST + '/users/me/token'
    console.log('CALL ' + call)

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID
    }

    console.log(usertosend)
    return await Api.SendReq(call, state.lang, Getters.getters.tok, 'DELETE', usertosend)
      .then(
        (res) => {
          console.log(res)
        }
      ).catch((err) => {
      console.log('ERROR: ' + err)
    }).then(() => {
      Mutations.mutations.clearAuthData()
    })

    localStorage.removeItem(rescodes.localStorage.expirationDate)
    localStorage.removeItem(rescodes.localStorage.token)
    localStorage.removeItem(rescodes.localStorage.userId)
    localStorage.removeItem(rescodes.localStorage.username)
    localStorage.removeItem(rescodes.localStorage.isLogged)
    // localStorage.removeItem(rescodes.localStorage.leftDrawerOpen)
    localStorage.removeItem(rescodes.localStorage.verifiedEmail)
    localStorage.removeItem(rescodes.localStorage.categorySel)

    router.push('/signin')
  }

  function setGlobal() {
    GlobalStore.mutations.setleftDrawerOpen(localStorage.getItem(rescodes.localStorage.leftDrawerOpen) === 'true')
    GlobalStore.mutations.setCategorySel(localStorage.getItem(rescodes.localStorage.categorySel))

    GlobalStore.actions.loadAfterLogin()

    Todos.actions.dbLoadTodo(true)


  }


  async function autologin (context) {
    try {
      console.log('*** Autologin ***')
      // INIT
      UserStore.mutations.setlang(process.env.LANG_DEFAULT)
      // ++Todo: Estrai la Lang dal Localstorage
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
        return false
      }
      const userId = String(localStorage.getItem(rescodes.localStorage.userId))
      const username = String(localStorage.getItem(rescodes.localStorage.username))
      const verifiedEmail = localStorage.getItem(rescodes.localStorage.verifiedEmail) === '1'

      console.log('autologin userId', userId)

      Mutations.mutations.authUser({
        userId: userId,
        username: username,
        idToken: token,
        verifiedEmail: verifiedEmail
      })

      setGlobal()

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
    autologin: b.dispatch(autologin)

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
