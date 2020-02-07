import Api from '@api'
import { ISignupOptions, ISigninOptions, IUserState, IUserFields, IUserProfile, ICalcStat } from 'model'
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

const bcrypt = require('bcryptjs')

export const DefaultCalc: ICalcStat = {
  numinvitati: 0,
  numinvitati_attivi: 0,
}

export const DefaultUser: IUserFields = {
  _id: '',
  email: '',
  username: '',
  name: '',
  surname: '',
  password: '',
  tokens: [],
  verified_email: false,
  aportador_solidario: '',
  made_gift: false,
  profile: {
    img: '',
    teleg_id: 0,
    saw_zoom_presentation: false,
    saw_and_accepted: false,
  },
  downline: [],
  calcstat: DefaultCalc,
  dashboard: null
}

export const DefaultProfile: IUserProfile = {
  img: '',
  nationality: '',
  intcode_cell: '',
  cell: process.env.TEST_CELL || '',
  dateofbirth: new Date(),
  sex: 0,
  country_pay: '',
  email_paypal: '',
  username_telegram: '',
  teleg_id: 0,
  teleg_checkcode: 0,
  my_dream: '',
  manage_telegram: false,
  saw_zoom_presentation: false,
  saw_and_accepted: false,
  paymenttypes: []
}

// State
const state: IUserState = {
  my: DefaultUser,
  lang: process.env.LANG_DEFAULT,
  repeatPassword: '',
  categorySel: 'personal',
  servercode: 0,
  x_auth_token: '',
  isLogged: false,
  isAdmin: false,
  isManager: false,
  usersList: [],
  countusers: 0,
  lastparamquery: {}
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

  const VistoZoom = b.read((mystate) => {
    if (state.my && state.my.profile) {
      return (state.my.profile.saw_zoom_presentation)
    }
    return false
  }, 'VistoZoom')

  const isServerError = b.read((mystate) => {
    return (state.servercode === tools.ERR_SERVERFETCH)
  }, 'isServerError')

  const getServerCode = b.read((mystate) => {
    return state.servercode
  }, 'getServerCode')

  const getMsg = b.read((mystate) => {
    return state.msg
  }, 'getMsg')

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

  const getPaymenttypeById = b.read((mystate: IUserState) => (id) => {
    const ctrec = mystate.my.profile.paymenttypes.find((mycontr) => mycontr.key === id)
    return (ctrec) ? ctrec.label : ''

  }, 'getPaymenttypeById')

  const getImgByUsername = b.read((mystate: IUserState) => (username): string => {
    if (username === '')
      return ''
    // Check if is this User!
    const myrec = UserStore.getters.getUserByUsername(username)
    // console.log('myrec', myrec)
    if (myrec && myrec.profile && !!myrec.profile.img && myrec.profile.img !== '' && myrec.profile.img !== 'undefined') {
      return myrec.profile.img
    } else {
      return ''
    }
  }, 'getImgByUsername')
  const getRefLink = b.read((mystate: IUserState) => (username: string): string => {
    // console.log('myrec', myrec)

    if (username === '')
      username = mystate.my.username
    return tools.getUrlSite() + '/signup/' + username

  }, 'getRefLink')

  const isVerificato = b.read((mystate: IUserState) => {
    const teleg_ok = mystate.my.profile.teleg_id > 0 && mystate.my.verified_email

    return teleg_ok
  }, 'isVerificato')

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
    get VistoZoom() {
      return VistoZoom()
    },
    get getServerCode() {
      return getServerCode()
    },
    get getMsg() {
      return getMsg()
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
    get getRefLink() {
      return getRefLink()
    },
    get getPaymenttypeById() {
      return getPaymenttypeById()
    },
    get isVerificato() {
      return isVerificato()
    },
  }

}

namespace Mutations {
  function authUser(mystate: IUserState, data: IUserFields) {
    mystate.my = { ...data }
    if (!mystate.my.profile) {
      mystate.my.profile = DefaultProfile
    }

    mystate.isAdmin = tools.isBitActive(mystate.my.perm, shared_consts.Permissions.Admin.value)
    mystate.isManager = tools.isBitActive(mystate.my.perm, shared_consts.Permissions.Manager.value)
    mystate.isTeacher = tools.isBitActive(mystate.my.perm, shared_consts.Permissions.Teacher.value)

    // console.log('authUser', 'state.isAdmin', mystate.isAdmin)
    // console.table(mystate)
    // console.table(data)

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

  function updateLocalStorage(mystate: IUserState, myuser: IUserFields) {
    const now = tools.getDateNow()
    // const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
    const expirationDate = new Date(now.getTime() * 1000)
    localStorage.setItem(tools.localStorage.lang, state.lang)
    localStorage.setItem(tools.localStorage.userId, myuser._id)
    localStorage.setItem(tools.localStorage.username, myuser.username)
    localStorage.setItem(tools.localStorage.name, myuser.name)
    localStorage.setItem(tools.localStorage.surname, myuser.surname)
    localStorage.setItem(tools.localStorage.perm, String(myuser.perm) || '')
    if (myuser.profile !== undefined)
      localStorage.setItem(tools.localStorage.img, (!!myuser.profile.img) ? String(myuser.profile.img) || '' : '')
    else
      localStorage.setItem(tools.localStorage.img, '')
    localStorage.setItem(tools.localStorage.token, state.x_auth_token)
    localStorage.setItem(tools.localStorage.expirationDate, expirationDate.toString())
    localStorage.setItem(tools.localStorage.isLogged, String(true))
    localStorage.setItem(tools.localStorage.verified_email, String(myuser.verified_email))
    localStorage.setItem(tools.localStorage.teleg_id, String(myuser.profile.teleg_id))
    localStorage.setItem(tools.localStorage.made_gift, String(myuser.made_gift))
    localStorage.setItem(tools.localStorage.wasAlreadySubOnDb, String(GlobalStore.state.wasAlreadySubOnDb))

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
    mystate.my = DefaultUser
    // resetArrToken(mystate.my.tokens)

    mystate.categorySel = 'personal'

    mystate.servercode = 0
    mystate.resStatus = 0
    mystate.isLogged = false
    mystate.x_auth_token = ''

    return true
  }

  function setErrorCatch(mystate: IUserState, axerr: Types.AxiosError) {
    try {
      if (mystate.servercode !== tools.ERR_SERVERFETCH) {
        mystate.servercode = axerr.getCode()
      }
      mystate.msg = axerr.getMsg()
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
    updateLocalStorage: b.commit(updateLocalStorage),
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

  async function resetpwd(context, paramquery) {

    const mydata = { ...paramquery }

    return bcrypt.hash(mydata.password, bcrypt.genSaltSync(12))
      .then((hashedPassword: string) => {
        mydata.repeatPassword = ''
        mydata.password = String(hashedPassword)

        return Api.SendReq('/updatepwd', 'POST', mydata, true)
          .then((res) => {
            return { code: res.data.code, msg: res.data.msg }
          })
          .catch((error: Types.AxiosError) => {
            UserStore.mutations.setErrorCatch(error)
            return { code: UserStore.getters.getServerCode, msg: error.getMsgError() }
          })
      })

  }

  async function requestpwd(context, paramquery) {

    const usertosend = {
      email: paramquery.email
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

  async function unsubscribe(context, paramquery) {

    return await Api.SendReq('/news/unsubscribe', 'POST', paramquery)
      .then((res) => {
        // console.log("RITORNO 2 ");
        // mutations.setServerCode(myres);
        if (res.data.code === serv_constants.RIS_UNSUBSCRIBED_OK) {
          console.log('DESOTTOSCRITTO ALLA NEWSLETTER !!')
        } else {
          console.log('Risultato di unsubscribe: ', res.data.code)
        }
        return { code: res.data.code, msg: res.data.msg }
      }).catch((error) => {
        return UserStore.getters.getServerCode
      })
  }

  async function importemail(context, paramquery) {

    return await Api.SendReq('/news/import', 'POST', paramquery)
      .then((res) => {
        // console.log("RITORNO 2 ");
        // mutations.setServerCode(myres);
        return res
      }).catch((error) => {
        return { numtot: 0, numadded: 0, numalreadyexisted: 0 }
      })
  }

  async function importExtraList(context, paramquery) {

    return await Api.SendReq('/users/import_extralist', 'POST', paramquery)
      .then((res) => {
        return res
      }).catch((error) => {
        return { numtot: 0, numadded: 0, numalreadyexisted: 0 }
      })
  }

  async function execDbOp(context, paramquery) {

    return await Api.SendReq('/users/dbop', 'POST', paramquery)
      .then((res) => {
        return res
      }).catch((error) => {
        return false
      })
  }

  async function newsletterload(context, paramquery) {

    return await Api.SendReq('/news/load', 'POST', paramquery)
      .then((res) => {
        // console.log('res', res)
        return res.data
      }).catch((error) => {
        return null
      })
  }

  async function newsletter_setactivate(context, paramquery) {

    return await Api.SendReq('/news/setactivate', 'POST', paramquery)
      .then((res) => {
        // console.log('res', res)
        return res.data
      }).catch((error) => {
        return null
      })
  }

  async function signup(context, authData: ISignupOptions) {
    console.log('SIGNUP')

    // console.log("PASSW: " + authData.password);

    const mylang = state.lang
    console.log('MYLANG: ' + mylang)

    return bcrypt.hash(authData.password, bcrypt.genSaltSync(12))
      .then((hashedPassword: string) => {
        /*
                const usertosend = {
                  lang: mylang,
                  email: authData.email,
                  password: String(hashedPassword),
                  username: authData.username,
                  name: authData.name,
                  surname: authData.surname
                }
                console.log(usertosend)

        */
        authData.lang = mylang
        authData.password = String(hashedPassword)

        Mutations.mutations.setServerCode(tools.CALLING)

        return Api.SendReq('/users', 'POST', authData)
          .then((res) => {

            const newuser = res.data

            // console.log('newuser', newuser)

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

              return { code: tools.OK, msg: '' }
            } else {
              return { code: tools.ERR_GENERICO, msg: '' }
            }
          })
          .catch((error) => {
            console.log('Err', error)
            UserStore.mutations.setErrorCatch(error)
            return { code: UserStore.getters.getServerCode, msg: UserStore.getters.getMsg }
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
            // console.table(myuser)

            Mutations.mutations.authUser(myuser)

            Mutations.mutations.updateLocalStorage(myuser)

            GlobalStore.actions.loadSite()

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
    localStorage.removeItem(tools.localStorage.teleg_id)
    localStorage.removeItem(tools.localStorage.made_gift)
    localStorage.removeItem(tools.localStorage.categorySel)
    localStorage.removeItem(tools.localStorage.wasAlreadySubOnDb)

    state.isLogged = false
    state.my = { ...DefaultUser }

    await GlobalStore.actions.clearDataAfterLogout()

    const riscall = await Api.SendReq('/users/me/token', 'DELETE', null)
      .then((res) => {
        console.log(res)
      }).then(() => {
        return Mutations.mutations.clearAuthData()
      }).catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return riscall

    // this.$router.push('/signin')
  }

  async function setGlobal(isLogged: boolean) {
    console.log('setGlobal', isLogged)
    try {
      // state.isLogged = true
      if (isLogged) {
        // console.log('state.isLogged', state.isLogged)

        GlobalStore.mutations.setleftDrawerOpen(localStorage.getItem(tools.localStorage.leftDrawerOpen) === 'true')
        GlobalStore.mutations.setCategorySel(localStorage.getItem(tools.localStorage.categorySel))

        GlobalStore.actions.checkUpdates()
      }

      const isok = await GlobalStore.actions.loadAfterLogin()

      state.isLogged = isok && isLogged

      if (static_data.functionality.ENABLE_TODOS_LOADING)
        await Todos.actions.dbLoad({ checkPending: true })

      if (static_data.functionality.ENABLE_PROJECTS_LOADING)
        await Projects.actions.dbLoad({ checkPending: true, onlyiffirsttime: true })

      // console.log('add routes')

      GlobalStore.actions.addDynamicPages()

      GlobalStore.state.finishLoading = true
      if (tools.isDebug())
        console.log('finishLoading', GlobalStore.state.finishLoading)

      // document.dispatchEvent(new Event('custom-post-render-event'))

    } catch (e) {
      console.error('Error', e)
      GlobalStore.state.finishLoading = true
    }

    return true
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
          const made_gift = localStorage.getItem(tools.localStorage.made_gift) === 'true'
          const perm = parseInt(localStorage.getItem(tools.localStorage.perm), 10)
          const img = String(localStorage.getItem(tools.localStorage.img))
          const teleg_id = parseInt(localStorage.getItem(tools.localStorage.teleg_id), 10)

          GlobalStore.state.wasAlreadySubOnDb = localStorage.getItem(tools.localStorage.wasAlreadySubOnDb) === 'true'

          console.log('*************  autologin _id', _id)

          UserStore.mutations.setAuth(token)

          Mutations.mutations.authUser({
            _id,
            username,
            name,
            surname,
            verified_email,
            made_gift,
            perm,
            profile: { img, teleg_id }
          })

          isLogged = true
        }
      }

      return await setGlobal(isLogged)

      // console.log('autologin _id STATE ', state._id)

      // return true
    } catch (e) {
      console.error('ERR autologin ', e.message)
      return false
    }
  }

  async function getDashboard(context, paramquery) {

    if (paramquery === null)
      paramquery = state.lastparamquery
    else
      state.lastparamquery = paramquery

    return await Api.SendReq('/dashboard', 'POST', paramquery)
      .then((res) => {
        if (res.status === 200) {
          state.my.dashboard = res.data.dashboard
          state.my.dashboard.myself = (res.data.dashboard.myself === undefined) ? DefaultUser : res.data.dashboard.myself
          state.my.dashboard.aportador = (res.data.dashboard.aportador === undefined) ? DefaultUser : res.data.dashboard.aportador
          state.my.dashboard.numpeople_aportador = (res.data.dashboard.numpeople_aportador === undefined) ? 0 : res.data.dashboard.numpeople_aportador

          return state.my.dashboard
        }
      }).catch((error) => {
        return {
          aportador: {},
          downline: []
        }
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
    vreg: b.dispatch(vreg),
    unsubscribe: b.dispatch(unsubscribe),
    importemail: b.dispatch(importemail),
    importExtraList: b.dispatch(importExtraList),
    execDbOp: b.dispatch(execDbOp),
    newsletterload: b.dispatch(newsletterload),
    newsletter_setactivate: b.dispatch(newsletter_setactivate),
    getDashboard: b.dispatch(getDashboard),
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
