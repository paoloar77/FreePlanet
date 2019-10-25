import Api from '@api'
import { ISignupOptions, ISigninOptions, IUserState, IUserFields } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from './Store/Store'
import router from '@router'

import { serv_constants } from '../Modules/serv_constants'
import { tools } from '../Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore, UserStore, Todos, Projects, CalendarStore } from '@store'
import globalroutines from './../../globalroutines/index'

import { static_data } from '@src/db/static_data'
import { db_data } from '@src/db/db_data'

import translate from './../../globalroutines/util'
import * as Types from '@src/store/Api/ApiTypes'
import { ICalendarState, ICfgServer } from '@src/model'
import { shared_consts } from '../../common/shared_vuejs'
import { IMessage } from '@src/model/Calendar'

const bcrypt = require('bcryptjs')

// State
const state: IUserState = {
  my: {
    _id: '',
    email: '',
    username: '',
    name: '',
    surname: '',
    password: '',
    tokens: [],
    verified_email: false
  },
  lang: process.env.LANG_DEFAULT,
  repeatPassword: '',
  categorySel: 'personal',
  servercode: 0,
  x_auth_token: '',
  isLogged: false,
  isAdmin: false,
  isManager: false,
  usersList: [],
  msgs: [],
  countusers: 0
}

const b = storeBuilder.module<IUserState>('UserModule', state)

namespace Getters {
  // const fullName = b.read(function fullName(state): string {
  //   return state.userInfos.firstname?capitalize(state.userInfos.firstname) + " " + capitalize(state.userInfos.lastname):null;
  // })

  const isUserInvalid = b.read((mystate) => {
    try {
      const ris = (mystate.my._id === undefined) || (mystate.my._id.trim() === '') || (mystate.my.tokens[0] === undefined)
      // console.log('state._id', state._id, 'ris', ris)
      return ris
    } catch (e) {
      return true
    }
  }, 'isUserInvalid')

  const lang = b.read((mystate) => {
    if (state.lang !== '') {
      return state.lang
    } else {
      return process.env.LANG_DEFAULT
    }
  }, 'lang')

  // const tok = b.read(state => {
  //   if (state.my.tokens) {
  //     if (typeof state.my.tokens[0] !== 'undefined') {
  //       return state.my.tokens[0].token
  //     } else {
  //       return ''
  //     }
  //   } else {
  //     return ''
  //   }
  // }, 'tok')

  const isServerError = b.read((mystate) => {
    return (state.servercode === tools.ERR_SERVERFETCH)
  }, 'isServerError')

  const getServerCode = b.read((mystate) => {
    return state.servercode
  }, 'getServerCode')

  const getNameSurnameByUserId = b.read((mystate: IUserState) => (userId: string) => {
    const user = UserStore.getters.getUserByUserId(userId)
    if (user)
      return user.name + ' ' + user.surname
    else
      return '(' + userId + ')'
  }, 'getNameSurnameByUserId')

  const getNameSurnameByUsername = b.read((mystate: IUserState) => (username: string) => {
    const user = UserStore.getters.getUserByUsername(username)
    if (user)
      return user.name + ' ' + user.surname
    else
      return '(' + username + ')'
  }, 'getNameSurnameByUsername')

  const getUsersList = b.read((mystate: IUserState) => {
    return mystate.usersList
  }, 'getUsersList')

  const IsMyFriend = b.read((mystate) => (userIdOwner) => {
    // ++TODO Check if userIdOwner is my friend
    // userIdOwner is my friend ?
    return true
  }, 'IsMyFriend')

  const IsMyGroup = b.read((mystate) => (userIdOwner) => {
    // ++TODO Check if userIdOwner is on my groups
    // userIdOwner is on my groups ?
    return true
  }, 'IsMyGroup')

  const getUserByUserId = b.read((mystate: IUserState) => (userId): IUserFields => {
    // Check if is this User!
    if (state.my._id === userId)
      return state.my

    return mystate.usersList.find((item) => item._id === userId)
  }, 'getUserByUserId')

  const getUserByUsername = b.read((mystate: IUserState) => (username): IUserFields => {
    // Check if is this User!
    if (state.my.username === username)
      return state.my

    return mystate.usersList.find((item) => item.username === username)
  }, 'getUserByUsername')

  const getImgByUsername = b.read((mystate: IUserState) => (username): string => {
    // Check if is this User!
    const myrec = UserStore.getters.getUserByUsername(username)
    console.log('getImgByUsername', username, myrec)
    if (myrec && !!myrec.img) {
      return myrec.img
    } else {
      return 'images/avatar/avatar3_small.png'
    }
  }, 'getImgByUsername')

  const getlasts_messages = b.read((mystate: IUserState) => () => {
    const ctrec = (mystate.msgs) ? mystate.msgs.slice(0, 5) : []
    // const ctrec = (mystate.msgs) ? mystate.msgs.slice().reverse().slice(0, 5) : []
    return (ctrec)

  }, 'getlasts_messages')

  const getnumMsgUnread = b.read((mystate: IUserState) => () => {
    return mystate.msgs.filter((msg) => !msg.read).length
  }, 'getnumMsgUnread')

  export const getters = {
    get isUserInvalid() {
      return isUserInvalid()
    },
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
    },
    get IsMyFriend() {
      return IsMyFriend()
    },
    get IsMyGroup() {
      return IsMyGroup()
    },
    get getNameSurnameByUserId() {
      return getNameSurnameByUserId()
    },
    get getUserByUserId() {
      return getUserByUserId()
    },
    get getNameSurnameByUsername() {
      return getNameSurnameByUsername()
    },
    get getImgByUsername() {
      return getImgByUsername()
    },
    get getUserByUsername() {
      return getUserByUsername()
    },
    get getUsersList() {
      return getUsersList()
    },
    get getlasts_messages() {
      return getlasts_messages()
    },
    get getnumMsgUnread() {
      return getnumMsgUnread()
    }
    // get fullName() { return fullName();},
  }

}

namespace Mutations {
  function authUser(mystate: IUserState, data: IUserFields) {
    mystate.my = {...data}

    mystate.isAdmin = tools.isBitActive(mystate.my.perm, shared_consts.Permissions.Admin)
    mystate.isManager = tools.isBitActive(mystate.my.perm, shared_consts.Permissions.Manager)

    // console.log('authUser', 'state.isAdmin', mystate.isAdmin)
    console.table(mystate)
    console.table(data)

    // if (data.my.verified_email) {
    //   mystate.my.verified_email = data.my.verified_email
    // }
    //
    // if (data.categorySel) {
    //   mystate.categorySel = data.categorySel
    // }  // ??

    mystate.my.tokens = []
    resetArrToken(mystate.my.tokens)
    mystate.my.tokens.push({ access: 'auth', token: mystate.x_auth_token, data_login: tools.getDateNow() })

    // console.log('state.my.tokens', state.my.tokens)
  }

  function setpassword(mystate: IUserState, newstr: string) {
    mystate.my.password = newstr
  }

  function setusersList(mystate: IUserState, usersList: IUserFields[]) {
    // console.log('setusersList', usersList)
    mystate.usersList = [...usersList]
  }

  function setemail(mystate: IUserState, newstr: string) {
    mystate.my.email = newstr
  }

  function setlang(mystate: IUserState, newstr: string) {
    console.log('SETLANG', newstr)
    mystate.lang = newstr
    tools.setLangAtt(newstr)
    localStorage.setItem(tools.localStorage.lang, state.lang)
  }

  function UpdatePwd(mystate: IUserState, x_auth_token: string) {
    mystate.x_auth_token = x_auth_token
    if (!mystate.my.tokens) {
      mystate.my.tokens = []
    }
    mystate.my.tokens.push({ access: 'auth', token: x_auth_token, data_login: tools.getDateNow() })
  }

  function setServerCode(mystate: IUserState, num: number) {
    mystate.servercode = num
  }

  function setResStatus(mystate: IUserState, status: number) {
    mystate.resStatus = status
  }

  function setAuth(mystate: IUserState, x_auth_token: string) {

    mystate.x_auth_token = x_auth_token
  }

  function resetArrToken(arrtokens) {
    if (!arrtokens) {
      arrtokens = []
    }

    // Take only the others access (from others Browser)
    return arrtokens.filter((token: IToken) => {
      return token.access !== 'auth'
    })
  }

  function clearAuthData(mystate: IUserState) {
    mystate.my._id = ''
    mystate.my.username = ''
    mystate.my.name = ''
    mystate.my.surname = ''
    resetArrToken(mystate.my.tokens)
    mystate.my.verified_email = false
    mystate.categorySel = 'personal'

    mystate.servercode = 0
    mystate.resStatus = 0
    mystate.isLogged = false
    mystate.x_auth_token = ''
  }

  function setErrorCatch(mystate: IUserState, axerr: Types.AxiosError) {
    try {
      if (mystate.servercode !== tools.ERR_SERVERFETCH) {
        mystate.servercode = axerr.getCode()
      }
      console.log('Err catch: (servercode:', axerr.getCode(), axerr.getMsgError(), ')')
    } catch (e) {
      console.log('Err catch:', axerr)
    }
  }

  function getMsgError(mystate: IUserState, err: number) {
    let msgerrore = ''
    if (err !== tools.OK) {
      msgerrore = 'Error [' + mystate.servercode + ']: '
      if (mystate.servercode === tools.ERR_SERVERFETCH) {
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
    getMsgError: b.commit(getMsgError),
    setusersList: b.commit(setusersList)
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

    const usertosend = {
      email: paramquery.my.email,
      password: paramquery.my.password,
      tokenforgot: paramquery.tokenforgot
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(tools.CALLING)

    return await Api.SendReq('/updatepwd', 'POST', usertosend, true)
      .then((res) => {
        return { code: res.data.code, msg: res.data.msg }
      })
      .catch((error: Types.AxiosError) => {
        UserStore.mutations.setErrorCatch(error)
        return { code: UserStore.getters.getServerCode, msg: error.getMsgError() }
      })

  }

  async function requestpwd(context, paramquery: IUserState) {

    const usertosend = {
      email: paramquery.my.email
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(tools.CALLING)

    return await Api.SendReq('/requestnewpwd', 'POST', usertosend)
      .then((res) => {
        return { code: res.data.code, msg: res.data.msg }
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

  }

  async function vreg(context, paramquery: ILinkReg) {
    const usertosend = {
      idlink: paramquery.idlink
    }
    console.log(usertosend)

    Mutations.mutations.setServerCode(tools.CALLING)

    return await Api.SendReq('/vreg', 'POST', usertosend)
      .then((res) => {
        // console.log("RITORNO 2 ");
        // mutations.setServerCode(myres);
        if (res.data.code === serv_constants.RIS_CODE_EMAIL_VERIFIED) {
          console.log('VERIFICATO !!')
          localStorage.setItem(tools.localStorage.verified_email, String(true))
        } else {
          console.log('Risultato di vreg: ', res.data.code)
        }
        return { code: res.data.code, msg: res.data.msg }
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })
  }

  async function signup(context, authData: ISignupOptions) {
    console.log('SIGNUP')

    // console.log("PASSW: " + authData.password);

    const mylang = state.lang
    console.log('MYLANG: ' + mylang)

    return bcrypt.hash(authData.password, bcrypt.genSaltSync(12))
      .then((hashedPassword: string) => {
        const usertosend = {
          lang: mylang,
          email: authData.email,
          password: String(hashedPassword),
          username: authData.username,
          name: authData.name,
          surname: authData.surname
        }

        console.log(usertosend)

        Mutations.mutations.setServerCode(tools.CALLING)

        return Api.SendReq('/users', 'POST', usertosend)
          .then((res) => {

            const newuser = res.data

            console.log('newuser', newuser)

            Mutations.mutations.setServerCode(res.status)

            if (res.status === 200) {
              if (process.env.DEV) {
                console.log('USERNAME = ' + newuser.username)
                console.log('IDUSER= ' + newuser._id)
              }

              Mutations.mutations.authUser(newuser)

              const now = tools.getDateNow()
              // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
              const expirationDate = new Date(now.getTime() * 1000)
              localStorage.setItem(tools.localStorage.lang, state.lang)
              localStorage.setItem(tools.localStorage.userId, newuser._id)
              localStorage.setItem(tools.localStorage.username, newuser.username)
              localStorage.setItem(tools.localStorage.name, newuser.name)
              localStorage.setItem(tools.localStorage.surname, newuser.surname)
              localStorage.setItem(tools.localStorage.token, state.x_auth_token)
              localStorage.setItem(tools.localStorage.expirationDate, expirationDate.toString())
              localStorage.setItem(tools.localStorage.verified_email, String(false))

              // Even if you has registered, you have to SignIn first
              state.isLogged = false
              // dispatch('storeUser', authData);
              // dispatch('setLogoutTimer', myres.data.expiresIn);

              return tools.OK
            } else {
              return tools.ERR_GENERICO
            }
          })
          .catch((error) => {
            UserStore.mutations.setErrorCatch(error)
            return UserStore.getters.getServerCode
          })
      })
  }

  async function signin(context, authData: ISigninOptions) {
    // console.log('LOGIN signin')

    // console.log('MYLANG = ' + state.lang)

    let sub = null

    try {
      if (static_data.functionality.PWA) {
        if ('serviceWorker' in navigator) {
          sub = await navigator.serviceWorker.ready
            .then((swreg) => {
              console.log('swreg')
              sub = swreg.pushManager.getSubscription()
              return sub
            })
            .catch((e) => {
              console.log('  ERROR ')
              sub = null
            })
        }
      }
    } catch (e) {
      console.log('Err navigator.serviceWorker.ready ... GetSubscription:', e)
    }

    const options = {
      title: translate('notification.title_subscribed'),
      content: translate('notification.subscribed'),
      openUrl: '/'
    }

    const usertosend = {
      username: authData.username,
      password: authData.password,
      lang: state.lang,
      subs: sub,
      options
    }

    if (process.env.DEBUG === '1') {
      console.log(usertosend)
    }

    Mutations.mutations.setServerCode(tools.CALLING)

    let myres: any

    // console.log('Api.SendReq')

    return Api.SendReq('/users/login', 'POST', usertosend, true)
      .then((res) => {
        myres = res

        if (myres.status !== 200) {
          return Promise.reject(tools.ERR_GENERICO)
        }
        return myres

      }).then((res) => {

        if (res.success) {
          GlobalStore.mutations.SetwasAlreadySubOnDb(res.data.subsExistonDb)

          const myuser: IUserFields = res.data.usertosend
          if (myuser) {
            console.table(myuser)

            Mutations.mutations.authUser(myuser)

            const now = tools.getDateNow()
            // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
            const expirationDate = new Date(now.getTime() * 1000)
            localStorage.setItem(tools.localStorage.lang, state.lang)
            localStorage.setItem(tools.localStorage.userId, myuser._id)
            localStorage.setItem(tools.localStorage.username, myuser.username)
            localStorage.setItem(tools.localStorage.name, myuser.name)
            localStorage.setItem(tools.localStorage.surname, myuser.surname)
            localStorage.setItem(tools.localStorage.perm, String(myuser.perm) || '')
            localStorage.setItem(tools.localStorage.img, String(myuser.img) || '')
            localStorage.setItem(tools.localStorage.token, state.x_auth_token)
            localStorage.setItem(tools.localStorage.expirationDate, expirationDate.toString())
            localStorage.setItem(tools.localStorage.isLogged, String(true))
            localStorage.setItem(tools.localStorage.verified_email, String(myuser.verified_email))
            localStorage.setItem(tools.localStorage.wasAlreadySubOnDb, String(GlobalStore.state.wasAlreadySubOnDb))

          }
        }

        return tools.OK

      }).then((code) => {
        if (code === tools.OK) {
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

    localStorage.removeItem(tools.localStorage.expirationDate)
    localStorage.removeItem(tools.localStorage.token)
    localStorage.removeItem(tools.localStorage.userId)
    localStorage.removeItem(tools.localStorage.username)
    localStorage.removeItem(tools.localStorage.name)
    localStorage.removeItem(tools.localStorage.surname)
    localStorage.removeItem(tools.localStorage.img)
    localStorage.removeItem(tools.localStorage.perm)
    localStorage.removeItem(tools.localStorage.isLogged)
    // localStorage.removeItem(rescodes.localStorage.leftDrawerOpen)
    localStorage.removeItem(tools.localStorage.verified_email)
    localStorage.removeItem(tools.localStorage.categorySel)
    localStorage.removeItem(tools.localStorage.wasAlreadySubOnDb)

    state.isLogged = false

    await GlobalStore.actions.clearDataAfterLogout()

    const riscall = await Api.SendReq('/users/me/token', 'DELETE', null)
      .then((res) => {
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

  async function setGlobal(isLogged: boolean) {
    console.log('setGlobal')
    // state.isLogged = true
    state.isLogged = isLogged
    if (isLogged) {
      // console.log('state.isLogged', state.isLogged)

      GlobalStore.mutations.setleftDrawerOpen(localStorage.getItem(tools.localStorage.leftDrawerOpen) === 'true')
      GlobalStore.mutations.setCategorySel(localStorage.getItem(tools.localStorage.categorySel))

      GlobalStore.actions.checkUpdates()
    }

    const p3 = await GlobalStore.actions.loadAfterLogin()

    if (static_data.functionality.ENABLE_TODOS_LOADING)
      await Todos.actions.dbLoad({ checkPending: true })

    if (static_data.functionality.ENABLE_PROJECTS_LOADING)
      await Projects.actions.dbLoad({ checkPending: true, onlyiffirsttime: true })

    // console.log('setGlobal: END')
  }

  async function autologin_FromLocalStorage(context) {
    try {
      // console.log('*** autologin_FromLocalStorage ***')
      // INIT

      let isLogged = false

      UserStore.state.lang = tools.getItemLS(tools.localStorage.lang)

      const token = localStorage.getItem(tools.localStorage.token)
      if (token) {
        const expirationDateStr = localStorage.getItem(tools.localStorage.expirationDate)
        const expirationDate = new Date(String(expirationDateStr))
        const now = tools.getDateNow()
        if (now < expirationDate) {
          const _id = String(localStorage.getItem(tools.localStorage.userId))
          const username = String(localStorage.getItem(tools.localStorage.username))
          const name = String(localStorage.getItem(tools.localStorage.name))
          const surname = String(localStorage.getItem(tools.localStorage.surname))
          const verified_email = localStorage.getItem(tools.localStorage.verified_email) === 'true'
          const perm = parseInt(localStorage.getItem(tools.localStorage.perm), 10)
          const img = String(localStorage.getItem(tools.localStorage.img))

          GlobalStore.state.wasAlreadySubOnDb = localStorage.getItem(tools.localStorage.wasAlreadySubOnDb) === 'true'

          console.log('*************  autologin _id', _id)

          UserStore.mutations.setAuth(token)

          Mutations.mutations.authUser({
            _id,
            username,
            name,
            surname,
            verified_email,
            perm,
            img
          })

          isLogged = true
        }
      }

      await setGlobal(isLogged)

      // console.log('autologin _id STATE ', state._id)

      return true
    } catch (e) {
      console.error('ERR autologin ', e.message)
      return false
    }
  }

  async function SendMsgEvent(context, msg: IMessage) {
    console.log('SendMsgEvent', msg)

    return await Api.SendReq('/sendmsg', 'POST', msg)
      .then((res) => {
        console.log('res', res)
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            msg._id = res.data.id
            state.msgs.push(msg)
            return true
          }
        }
        return false
      })
      .catch((error) => {
        console.error(error)
        return false
      })

  }

  /*
    async function refreshUserInfos(){
      let {token, refresh_token} = JWT.fetch();
      if (!!token) {
        try {
          let { data } = await Api.checkSession({token, refresh_token});
          JWT.set(data);
          let userData = await jwtDecode(data.token);
          LoginModule.mutations.updateUserInfos({userData, token: data.token});
        } catch(e) {
          Mutations.mutations.disconnectUser();
        }
      }
    }
  */

  export const actions = {
    autologin_FromLocalStorage: b.dispatch(autologin_FromLocalStorage),
    logout: b.dispatch(logout),
    requestpwd: b.dispatch(requestpwd),
    resetpwd: b.dispatch(resetpwd),
    signin: b.dispatch(signin),
    signup: b.dispatch(signup),
    SendMsgEvent: b.dispatch(SendMsgEvent),
    vreg: b.dispatch(vreg)
  }

}

const stateGetter = b.state()

// Module
const UserModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default UserModule
