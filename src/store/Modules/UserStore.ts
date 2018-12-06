
import Api from '@api'
import { ISignupOptions, ISigninOptions, IUserState } from 'model'
import { ILinkReg, IResult, IIdToken } from 'model/other'
import { storeBuilder } from './Store/Store'
import router from '@router'

import { serv_constants } from '../Modules/serv_constants'
import { rescodes } from '../Modules/rescodes'



const bcrypt = require('bcryptjs')


// State
const state: IUserState = {
  _id: '',
  email:  '',
  username: '',
  idapp: process.env.APP_ID,
  password: '',
  lang: '',
  repeatPassword: '',
  idToken: '',
  userId: 0,
  tokens: [],
  verifiedEmail: false
}


const b = storeBuilder.module<IUserState>('UserModule', state)
const stateGetter = b.state()

namespace Getters {

  const lang = b.read(function lang(state): string {
    if (state.lang !== '') {
      return state.lang
    } else {
      return process.env.LANG_DEFAULT
    }
  })

  const tok = b.read(function tok(state): string {
    if (state.tokens) {
      if (typeof state.tokens[0] !== 'undefined') {
        return state.tokens[0].token
      } else {
        return ''
      }
    } else {
      return ''
    }
  })

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
    state.username = data.username
    state.userId = data.userId
    state.idToken = data.idToken
    state.verifiedEmail = data.verifiedEmail
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
    state.username = ''
    state.tokens = []
    state.idToken = ''
    state.userId = 0
    state.verifiedEmail = false
  }

  function autologin (state: IUserState) {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const expirationDateStr = localStorage.getItem('expirationDate')
    let expirationDate = new Date(String(expirationDateStr))
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
    const userId = Number(localStorage.getItem('userId'))
    const username = String(localStorage.getItem('username'))
    const verifiedEmail = localStorage.getItem('verificato') === '1'

    mutations.authUser({
      username: username,
      userId: userId,
      idToken: token,
      verifiedEmail: verifiedEmail
    })
  }

  export const mutations = {
    authUser: b.commit(authUser),
    setpassword: b.commit(setpassword),
    setemail: b.commit(setemail),
    setlang: b.commit(setlang),
    UpdatePwd: b.commit(UpdatePwd),
    setServerCode: b.commit(setServerCode),
    clearAuthData: b.commit(clearAuthData),
    autologin: b.commit(autologin)
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

    return Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
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
        localStorage.setItem('token', x_auth_token)

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

    return Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
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
      idLink: paramquery.idLink
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(rescodes.CALLING)

    let myres

    return Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
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
          localStorage.setItem('verificato', '1')
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
              let iduser = body._id
              let username = authData.username
              if (process.env.DEV) {
                console.log('USERNAME = ' + username)
                console.log('IDUSER= ' + iduser)
              }

              Mutations.mutations.authUser({
                username: username,
                userId: iduser,
                idToken: x_auth_token,
                verifiedEmail: false
              })

              const now = new Date()
              // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
              const expirationDate = new Date(now.getTime() + 1000)
              localStorage.setItem('username', username)
              localStorage.setItem('token', x_auth_token)
              localStorage.setItem('userId', iduser)
              localStorage.setItem('expirationDate', expirationDate.toString())
              localStorage.setItem('verificato', '0')
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
              console.log('ERROREEEEEEEEE')
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

    return Api.SendReq(call, state.lang, Getters.getters.tok, 'POST', usertosend)
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
          let iduser = body._id
          let username = authData.username
          let verifiedEmail = body.verifiedEmail === 'true' || body.verifiedEmail === true
          if (process.env.DEV) {
            console.log('USERNAME = ' + username)
            console.log('IDUSER= ' + iduser)
            Mutations.mutations.authUser({
              username: username,
              userId: iduser,
              idToken: x_auth_token,
              verifiedEmail: verifiedEmail
            })
          }

          const now = new Date()
          // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
          const expirationDate = new Date(now.getTime() + 1000)
          localStorage.setItem('username', username)
          localStorage.setItem('token', x_auth_token)
          localStorage.setItem('userId', iduser)
          localStorage.setItem('expirationDate', expirationDate.toString())
          localStorage.setItem('isLoggedin', String(true))
          localStorage.setItem('verificato', String(verifiedEmail))

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
          console.log('ERROREEEEEEEEE')
          console.log(error)
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
    Api.SendReq(call, state.lang, Getters.getters.tok, 'DELETE', usertosend)
      .then(
        (res) => {
          console.log(res)
        }
      ).catch((err) => {
      console.log('ERROR: ' + err)
    }).then(() => {
      Mutations.mutations.clearAuthData()
    })

    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('isLoggedin')
    localStorage.removeItem('verifiedEmail')

    router.push('/signin')
  }


  export const actions = {
    resetpwd: b.dispatch(resetpwd),
    requestpwd: b.dispatch(requestpwd),
    vreg: b.dispatch(vreg),
    signup: b.dispatch(signup),
    signin: b.dispatch(signin),
    logout: b.dispatch(logout)

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
