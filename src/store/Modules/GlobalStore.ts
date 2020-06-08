import { ICfgServer, IConfig, IGlobalState, IListRoutes, IMenuList, ISettings, StateConnection } from 'model'
import { storeBuilder } from './Store/Store'

import Vue from 'vue'

import translate from './../../globalroutines/util'

import urlBase64ToUint8Array from '../../js/utility'

import Api from '@api'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import * as ApiTables from '@src/store/Modules/ApiTables'
import { CalendarStore, GlobalStore, MessageStore, Projects, Todos, UserStore } from '@store'
import messages from '../../statics/i18n'
import globalroutines from './../../globalroutines/index'

import { cfgrouter } from '../../router/route-config'
import { static_data } from '@src/db/static_data'
import { IDataPass, IParamsQuery } from '@src/model/GlobalStore'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { IUserState } from '@src/model'
import { Calendar } from 'element-ui'
import { fieldsTable } from '@src/store/Modules/fieldsTable'
import router from '@router'
// import { static_data } from '@src/db/static_data'

let stateConnDefault = 'online'

getstateConnSaved()
  .then((conn) => {
    stateConnDefault = conn
  })

const state: IGlobalState = {
  finishLoading: false,
  conta: 0,
  wasAlreadySubscribed: false,
  wasAlreadySubOnDb: false,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  leftDrawerOpen: true,
  RightDrawerOpen: false,
  stateConnection: stateConnDefault,
  networkDataReceived: false,
  cfgServer: [],
  testp1: { contatore: 0, mioarray: [] },
  category: 'personal',
  posts: [],
  menulinks: {},
  listatodo: [
    { nametranslate: 'personal', description: 'personal' },
    { nametranslate: 'work', description: 'work' },
    { nametranslate: 'shopping', description: 'shopping' }
  ],
  connData: {
    uploading_server: 0,
    uploading_indexeddb: 0,
    downloading_server: 0,
    downloading_indexeddb: 0
  },
  arrConfig: [],
  lastaction: {
    table: '',
    type: 0,
    _id: 0
  },
  serv_settings: [],
  templemail: [],
  opzemail: [],
  settings: [],
  disciplines: [],
  paymenttypes: [],
  autoplaydisc: 8000,
  newstosent: [],
  gallery: [],
  mailinglist: [],
  mypage: [],
  calzoom: []
}

async function getConfig(id) {
  return await globalroutines(null, 'read', 'config', null, id)
}

async function getstateConnSaved() {
  const config = await getConfig(costanti.CONFIG_ID_CFG)
  // console.log('config', config)
  if (config) {
    if (config.length > 1) {
      const cfgstateconn = config[1]
      return cfgstateconn.stateconn
    } else {
      return 'online'
    }
  } else {
    return 'offline'
  }
}

const b = storeBuilder.module<IGlobalState>('GlobalModule', state)

// Getters
namespace Getters {

  const conta = b.read((state) => state.conta, 'conta')
  const listatodo = b.read((state) => state.listatodo, 'listatodo')
  const category = b.read((state) => state.category, 'category')

  const testpao1_getter_contatore = b.read((state) => (param1) => state.testp1.contatore + 100 + param1, 'testpao1_getter_contatore')
  const testpao1_getter_array = b.read((state) => (param1) => state.testp1.mioarray.filter((item) => item).map((item) => item.valore), 'testpao1_getter_array')

  const getConfigbyId = b.read((state) => (id) => state.arrConfig.find((item) => item._id === id), 'getConfigbyId')
  const getConfigStringbyId = b.read((state) => (params) => {
    const config = state.arrConfig.find((item) => item._id === params.id)
    if (config) {
      return config.value
    } else {
      return params.default
    }
  }, 'getConfigStringbyId')

  const showtype = b.read((state) => {
    // const config = state.arrConfig.find(item => item._id === cat + costanti.CONFIG_ID_SHOW_TYPE_TODOS)
    const config = state.arrConfig.find((item) => item._id === costanti.CONFIG_ID_SHOW_TYPE_TODOS)
    if (config) {
      return config.value
    }
    else {
      return ''
    }

  }, 'showtype')

  const getPage = b.read((mystate: IGlobalState) => (path) => {
    // const config = state.arrConfig.find(item => item._id === cat + costanti.CONFIG_ID_SHOW_TYPE_TODOS)
    return mystate.mypage.find((page) => (`/` + page.path) === path)

  }, 'getPage')

  const getmenu = b.read((mystate: IGlobalState) => {
    // console.log('getmenu', cfgrouter.getmenu())

    mystate.menulinks = {
      Dashboard: {
        routes: cfgrouter.getmenu(),
        show: true
      }
    }

    return mystate.menulinks

    // console.log('state.menulinks', state.menulinks)

  }, 'getmenu')

  const t = b.read((state) => (params) => {
    const msg = params.split('.')
    const lang = toolsext.getLocale()

    const stringa = messages[lang]

    let ris = stringa
    msg.forEach((param) => {
      ris = ris[param]
    })

    return ris
  }, 't')

  const getListByTable = b.read((state) => (table) => {
    if (table === tools.TABEVENTS)
      return CalendarStore.state.eventlist
    else if (table === 'operators')
      return CalendarStore.state.operators
    else if (table === 'wheres')
      return CalendarStore.state.wheres
    else if (table === 'contribtype')
      return CalendarStore.state.contribtype
    else if (table === 'disciplines')
      return GlobalStore.state.disciplines
    else if (table === tools.TABNEWSLETTER)
      return GlobalStore.state.newstosent
    else if (table === tools.TABGALLERY)
      return GlobalStore.state.gallery
    else if (table === tools.TABTEMPLEMAIL)
      return GlobalStore.state.templemail
    else if (table === tools.TABOPZEMAIL)
      return GlobalStore.state.opzemail
    else if (table === tools.TABMAILINGLIST)
      return GlobalStore.state.mailinglist
    else if (table === tools.TABMYPAGE)
      return GlobalStore.state.mypage
    else if (table === tools.TABCALZOOM)
      return GlobalStore.state.calzoom
    else if (table === 'paymenttypes')
      return GlobalStore.state.paymenttypes
    else if (table === 'bookings')
      return CalendarStore.state.bookedevent
    else if (table === 'users')
      return UserStore.state.usersList
    else if (table === 'sendmsgs')
      return MessageStore.state.last_msgs
    else if (table === 'settings')
      return UserStore.state.settings
    else
      return null

  }, 'getListByTable')

  const getrecSettingsByKey = b.read((mystate: IGlobalState) => (key, serv): ISettings => {
    if (serv)
      return mystate.serv_settings.find((rec) => rec.key === key)
    else
      return mystate.settings.find((rec) => rec.key === key)
  }, 'getrecSettingsByKey')

  const getValueSettingsByKey = b.read((mystate: IGlobalState) => (key, serv): any => {

    const myrec = getters.getrecSettingsByKey(key, serv)

    if (!!myrec) {
      if (myrec.type === tools.FieldType.date)
        return myrec.value_date
      else if (myrec.type === tools.FieldType.number)
        return myrec.value_num
      else if (myrec.type === tools.FieldType.boolean)
        return myrec.value_bool
      else
        return myrec.value_str
    } else {
      return ''
    }

  }, 'getValueSettingsByKey')

  const gettemplemailbyId = b.read((mystate: IGlobalState) => (templid): string => {
    const myrec = mystate.templemail.find((rec) => rec._id === templid)
    return (!!myrec) ? myrec.subject : ''
  }, 'gettemplemailbyId')

  export const getters = {
    get testpao1_getter_contatore() {
      return testpao1_getter_contatore()
    },
    get testpao1_getter_array() {
      return testpao1_getter_array()
    },
    get conta() {
      return conta()
    },

    get listaTodo() {
      return listatodo()
    },

    get category() {
      return category()
    },

    get getConfigbyId() {
      return getConfigbyId()
    },

    get getConfigStringbyId() {
      return getConfigStringbyId()
    },

    get showtype() {
      return showtype()
    },

    get getmenu() {
      return getmenu()
    },

    get getListByTable() {
      return getListByTable()
    },

    get getValueSettingsByKey() {
      return getValueSettingsByKey()
    },

    get getrecSettingsByKey() {
      return getrecSettingsByKey()
    },

    get gettemplemailbyId() {
      return gettemplemailbyId()
    },

    get getPage() {
      return getPage()
    },

    get t() {
      return t()
    },

    get isOnline() {
      // console.log('*********************** isOnline')
      return state.stateConnection === 'online'
    },

    get isNewVersionAvailable() {
      // console.log('state.cfgServer', state.cfgServer)
      const serversrec = state.cfgServer.find((x) => (x.chiave === tools.SERVKEY_VERS) && (x.idapp === process.env.APP_ID))
      // console.log('Record ', serversrec)
      if (serversrec) {
        console.log('Vers Server ', serversrec.valore, 'Vers locale:', process.env.APP_VERSION)
        return serversrec.valore !== process.env.APP_VERSION
      } else {
        return false
      }
    }
  }
}

namespace Mutations {
  function setPaoArray(state: IGlobalState, miorec: ICfgServer) {
    state.testp1.mioarray[state.testp1.mioarray.length - 1] = miorec

    tools.notifyarraychanged(state.testp1.mioarray)
    console.log('last elem = ', state.testp1.mioarray[state.testp1.mioarray.length - 1])
  }

  function NewArray(state: IGlobalState, newarr: ICfgServer[]) {
    state.testp1.mioarray = newarr
  }

  function setPaoArray_Delete(state: IGlobalState) {
    state.testp1.mioarray.pop()
  }

  function setConta(state: IGlobalState, num: number) {
    state.conta = num
  }

  function setleftDrawerOpen(state: IGlobalState, bool: boolean) {
    state.leftDrawerOpen = bool
  }

  function setCategorySel(state: IGlobalState, cat: string) {
    state.category = cat
  }

  function setStateConnection(state: IGlobalState, stateconn: StateConnection) {
    if (state.stateConnection !== stateconn) {
      console.log('INTERNET ', stateconn)
      state.stateConnection = stateconn
    }
  }

  function saveConfig(state: IGlobalState, data: IConfig) {
    let dataout
    // this.$set(dataout, data.value, {'value': 'default value'})
    return globalroutines(null, 'write', 'config', { _id: data._id, value: data.value })
  }

  function SetwasAlreadySubOnDb(state: IGlobalState, subscrib: boolean) {
    state.wasAlreadySubOnDb = subscrib
  }

  function setShowType(state: IGlobalState, showtype: number) {
    console.log('setShowType', showtype)
    const config = Getters.getters.getConfigbyId(costanti.CONFIG_ID_SHOW_TYPE_TODOS)
    console.log('config', config)
    if (config) {
      config.value = String(showtype)
      Todos.state.showtype = parseInt(config.value, 10)
    } else {
      Todos.state.showtype = showtype
    }
    console.log('Todos.state.showtype', Todos.state.showtype)
    GlobalStore.mutations.saveConfig({ _id: costanti.CONFIG_ID_SHOW_TYPE_TODOS, value: String(showtype) })

  }

  function UpdateValuesInMemory(mystate: IGlobalState, mydata: IDataPass) {

    const id = mydata.id
    const table = mydata.table

    try {
      const mylist = Getters.getters.getListByTable(table)
      const mykey = fieldsTable.getKeyByTable(table)

      if (!!mylist) {
        const myrec = mylist.find((event) => event[mykey] === id)
        // console.log('myrec', myrec)
        if (myrec) {
          for (const [key, value] of Object.entries(mydata.fieldsvalue)) {
            // console.log('key', value, myrec[key])
            myrec[key] = value
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  function setValueSettingsByKey(mystate: IGlobalState, { key, value, serv }) {
    // Update the Server

    // Update in Memory
    let myrec = null
    if (serv)
      myrec = mystate.serv_settings.find((rec) => rec.key === key)
    else
      myrec = mystate.settings.find((rec) => rec.key === key)

    if (!!myrec) {
      if (myrec.type === tools.FieldType.date)
        myrec.value_date = value
      else if (myrec.type === tools.FieldType.number)
        myrec.value_num = value
      else if (myrec.type === tools.FieldType.boolean)
        myrec.value_bool = value
      else
        myrec.value_str = value

      console.log('setValueSettingsByKey value', value, 'myrec', myrec)
    }

  }

  export const mutations = {
    setConta: b.commit(setConta),
    setleftDrawerOpen: b.commit(setleftDrawerOpen),
    setCategorySel: b.commit(setCategorySel),
    setStateConnection: b.commit(setStateConnection),
    SetwasAlreadySubOnDb: b.commit(SetwasAlreadySubOnDb),
    saveConfig: b.commit(saveConfig),
    setPaoArray: b.commit(setPaoArray),
    setPaoArray_Delete: b.commit(setPaoArray_Delete),
    NewArray: b.commit(NewArray),
    setShowType: b.commit(setShowType),
    UpdateValuesInMemory: b.commit(UpdateValuesInMemory),
    setValueSettingsByKey: b.commit(setValueSettingsByKey)
  }

}

namespace Actions {
  async function setConta(context, num: number) {
    Mutations.mutations.setConta(num)
  }

  function createPushSubscription(context) {

    // If Already subscribed, don't send to the Server DB
    // if (state.wasAlreadySubOnDb) {
    //   // console.log('wasAlreadySubOnDb!')
    //   return
    // }

    if (!static_data.functionality.PWA)
      return

    if (!('serviceWorker' in navigator)) {
      return
    }

    if (!('PushManager' in window)) {
      return
    }

    console.log('createPushSubscription')

    let reg
    const mykey = process.env.PUBLICKEY_PUSH
    const mystate = state
    return navigator.serviceWorker.ready
      .then((swreg) => {
        reg = swreg
        return swreg.pushManager.getSubscription()
      })
      .then((subscription) => {
        console.log('subscription = ', subscription)

        mystate.wasAlreadySubscribed = !(subscription === null)

        if (mystate.wasAlreadySubscribed) {
          // console.log('User is already SAVED Subscribe on DB!')
          // return null
          return subscription
        } else {
          // Create a new subscription
          console.log('Create a new subscription')
          const convertedVapidPublicKey = urlBase64ToUint8Array(mykey)
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          })
        }
      })
      .then((newSub) => {
        saveNewSubscriptionToServer(context, newSub)
      })
      .catch((err) => {
        console.log('ERR createPushSubscription:', err)
      })
  }

  // Calling the Server to Save in the MongoDB the Subscriber
  function saveNewSubscriptionToServer(context, newSub) {

    // If already subscribed, exit
    // if (true) {
    //   return
    // }

    if (!newSub) {
      return
    }

    if (UserStore.getters.isUserInvalid) {
      return
    }

    // console.log('saveSubscriptionToServer: ', newSub)
    // console.log('context', context)

    console.log('saveNewSubscriptionToServer')

    let options = null
    let notreg = false

    if (UserStore.getters.isTokenInvalid) {
      notreg = true
    }

    // If is not already stored in DB, then show the message to the user.
    if (!state.wasAlreadySubscribed || notreg) {
      options = {
        title: tools.translate('notification.title_subscribed', [{
          strin: 'sitename',
          strout: translate('ws.sitename')
        }]),
        content: translate('notification.subscribed'),
        openUrl: '/'
      }
    }

    const myres = {
      options,
      subs: newSub,
      others: {
        userId: UserStore.state.my._id,
        access: UserStore.state.my.tokens[0].access
      }
    }

    return Api.SendReq('/subscribe', 'POST', myres)
      .then((res) => {
        state.wasAlreadySubscribed = true
        state.wasAlreadySubOnDb = true

        localStorage.setItem(tools.localStorage.wasAlreadySubOnDb, String(state.wasAlreadySubOnDb))
      })
      .catch((e) => {
        console.log('Error during Subscription!', e)
      })
  }

  async function deleteSubscriptionToServer(context) {
    console.log('DeleteSubscriptionToServer: ')

    return Api.SendReq('/subscribe/del', 'DELETE', null)
      .then((res) => {

      })

  }

  function prova(context) {
    // console.log('prova')
    // state.testp1.mioarray[state.testp1.mioarray.length - 1].valore = 'VALMODIF';

    // let msg = t('notification.title_subscribed')

    // console.log('msg', msg)

  }

  async function clearDataAfterLogout(context) {
    console.log('clearDataAfterLogout')

    // Clear all data from the IndexedDB
    for (const table of ApiTables.allTables()) {
      await globalroutines(null, 'clearalldata', table, null)
    }

    if (static_data.functionality.PWA) {
      if ('serviceWorker' in navigator) {
        // REMOVE ALL SUBSCRIPTION
        console.log('REMOVE ALL SUBSCRIPTION...')
        await navigator.serviceWorker.ready.then((reg) => {
          console.log('... Ready')
          reg.pushManager.getSubscription().then((subscription) => {
            console.log('    Found Subscription...')
            if (subscription) {
              subscription.unsubscribe().then((successful) => {
                // You've successfully unsubscribed
                console.log('You\'ve successfully unsubscribed')
              }).catch((e) => {
                // Unsubscription failed
              })
            }
          })
        })
      }
    }

    await deleteSubscriptionToServer(context)

  }

  async function clearDataAfterLoginOnlyIfActiveConnection(context) {

  }

  async function loadAfterLogin(context) {
    console.log('loadAfterLogin')
    actions.clearDataAfterLoginOnlyIfActiveConnection()

    let isok = false

    if (!await Actions.actions.loadSite()) {
      this.$router.push('/signin')
    } else {
      isok = true
    }

    state.arrConfig = await globalroutines(null, 'readall', 'config', null)

    return isok
  }

  async function saveCfgServerKey(context, dataval: ICfgServer) {
    console.log('saveCfgServerKey dataval', dataval)

    const ris = await Api.SendReq('/admin/updateval', 'POST', { pairval: dataval })
      .then((res) => {

      })

  }

  async function checkUpdates(context) {
    console.log('checkUpdates')

    // if (UserStore.state.my._id === '')
    //   return false // Login not made

    state.networkDataReceived = false

    const ris = await Api.SendReq('/checkupdates', 'GET', null)
      .then((res) => {
        state.networkDataReceived = true

        // console.log('******* checkUpdates RES :', res.data.cfgServer)
        if (res.data.cfgServer) {
          state.cfgServer = [...res.data.cfgServer]
          // console.log('res.data.cfgServer', res.data.cfgServer)
        }

        // console.log('res.data.userslist', res.data.usersList)
        if (res.data.usersList) {
          UserStore.mutations.setusersList(res.data.usersList)
        }

        if (res.data.last_msgs) {
          MessageStore.state.last_msgs = [...res.data.last_msgs]
        }

        // console.log('MessageStore.state.last_msgs', MessageStore.state.last_msgs)

        // console.log('**********  res', 'state.todos', state.todos, 'checkPending', checkPending)
        // After Login will store into the indexedDb...

        return res
      })
      .catch((error) => {
        console.log('error checkUpdates', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

  }

  async function sendPushNotif(context, { params }) {

    return await Api.SendReq('/push/send', 'POST', { params })
      .then((res) => {
        // console.table(res)
        return res.data
      })
      .catch((error) => {
        console.log('error sendPushNotif', error)
        return null
      })
  }

  async function loadTable(context, params: IParamsQuery) {
    // console.log('loadTable', params)

    return await Api.SendReq('/gettable', 'POST', params)
      .then((res) => {
        // console.table(res)
        return res.data
      })
      .catch((error) => {
        console.log('error loadTable', error)
        UserStore.mutations.setErrorCatch(error)
        return null
      })
  }

  async function saveTable(context, mydata: object) {
    // console.log('saveTable', mydata)

    return await Api.SendReq('/settable', 'POST', mydata)
      .then((res) => {
        // console.table(res)
        return res.data
      })
      .catch((error) => {
        console.log('error saveTable', error)
        UserStore.mutations.setErrorCatch(error)
        return null
      })
  }

  async function saveFieldValue(context, mydata: IDataPass) {
    // console.log('saveFieldValue', mydata)

    return await Api.SendReq(`/chval`, 'PATCH', { data: mydata })
      .then((res) => {
        if (res) {
          Mutations.mutations.UpdateValuesInMemory(mydata)
          return (res.data.code === serv_constants.RIS_CODE_OK)
        } else
          return false
      })
      .catch((error) => {
        return false
      })
  }

  async function callFunz(context, { mydata }) {
    // console.log('saveFieldValue', mydata)

    return await Api.SendReq(`/callfunz`, 'PATCH', { data: mydata })
      .then((res) => {
        if (res) {
          return (res.data.code === serv_constants.RIS_CODE_OK)
        } else
          return false
      })
      .catch((error) => {
        return false
      })
  }

  async function askFunz(context, { mydata }) {
    // console.log('saveFieldValue', mydata)

    return await Api.SendReq(`/askfunz`, 'PATCH', { data: mydata })
      .then((ris) => {
        return ris.data.out
      })
      .catch((error) => {
        return null
      })
  }

  async function DeleteRec(context, { table, id }) {
    console.log('DeleteRec', table, id)

    return await Api.SendReq('/delrec/' + table + '/' + id, 'DELETE', null)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
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

  async function DeleteFile(context, { filename }) {
    console.log('DeleteFile', filename)

    return await Api.SendReq('/delfile', 'DELETE', { filename })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
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

  async function DuplicateRec(context, { table, id }) {
    console.log('DuplicateRec', id)

    return await Api.SendReq('/duprec/' + table + '/' + id, 'POST', null)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.record
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function InviaMsgADonatori(context, { msgobj, navemediatore, tipomsg }) {
    console.log('InviaMsgADonatori', msgobj)

    const mydata = {
      idapp: process.env.APP_ID,
      msgextra: msgobj.msgextra,
      msgpar1: msgobj.msgpar1,
      username: msgobj.username,
      username_mitt: msgobj.username_mitt,
      tipomsg,
      inviareale: msgobj.inviareale,
      navemediatore
    }

    return await Api.SendReq('/dashboard/msgnave', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function InviaMsgAFlotta(context, { flotta, inviareale, inviaemail, tipomsg }) {
    console.log('InviaMsgAFlotta')

    const mydata = {
      idapp: process.env.APP_ID,
      tipomsg,
      flotta,
      inviareale,
      inviaemail,
    }

    return await Api.SendReq('/dashboard/msgflotta', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetArrNavi(context) {
    console.log('GetArrNavi')

    const mydata = {
      idapp: process.env.APP_ID
    }

    return await Api.SendReq('/dashboard/getnavi', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetMsgTemplates(context) {
    console.log('GetMsgTemplates')

    const mydata = {
      idapp: process.env.APP_ID
    }

    return await Api.SendReq('/dashboard/getmsg_templates', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetNave(context, { riga, col, riga1don, col1don, ind_order }) {
    // console.log('GetNave')

    const mydata = {
      idapp: process.env.APP_ID,
      riga,
      col,
      riga1don,
      col1don,
      ind_order
    }

    return await Api.SendReq('/dashboard/getnave', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetData(context, { data }) {
    console.log('GetData')

    const mydata = {
      idapp: process.env.APP_ID,
      data
    }

    return await Api.SendReq('/dashboard/getdata', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetArrDoniNavi(context, { ricalcola, showall }) {
    console.log('GetArrDoniNavi')

    const mydata = {
      idapp: process.env.APP_ID,
      ricalcola,
      showall
    }

    return await Api.SendReq('/dashboard/getdoninavi', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.ris
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetFlotte(context, { ricalcola, showall }) {
    console.log('GetFlotte')

    const mydata = {
      idapp: process.env.APP_ID,
      ricalcola,
      showall
    }

    return await Api.SendReq('/dashboard/getflotte', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data.arrflotte
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function GetFlotta(context, { riga, col_prima, col_ultima}) {
    console.log('GetFlotta')

    const mydata = {
      idapp: process.env.APP_ID,
      riga,
      col_prima,
      col_ultima,
    }

    return await Api.SendReq('/dashboard/getflotta', 'POST', mydata)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            return res.data
          }
        }
        return null
      })
      .catch((error) => {
        console.error(error)
        return null
      })
  }

  async function loadSite(context) {
    // console.log('CalendarStore: loadAfterLogin')
    // Load local data
    const showall = UserStore.state.isAdmin || UserStore.state.isManager ? '1' : '0'

    const myuserid = (UserStore.state.my._id) ? UserStore.state.my._id : '0'

    CalendarStore.state.editable = false

    return await Api.SendReq('/loadsite/' + myuserid + '/' + process.env.APP_ID + '/' + showall, 'GET', null)
      .then((res) => {
        // console.log('____________________________  res', res)
        if (res.status === 200) {
          CalendarStore.state.bookedevent = (res.data.bookedevent) ? res.data.bookedevent : []
          CalendarStore.state.eventlist = (res.data.eventlist) ? res.data.eventlist : []
          CalendarStore.state.operators = (res.data.operators) ? res.data.operators : []
          CalendarStore.state.wheres = (res.data.wheres) ? res.data.wheres : []
          CalendarStore.state.contribtype = (res.data.contribtype) ? res.data.contribtype : []
          GlobalStore.state.settings = (res.data.settings) ? [...res.data.settings] : []
          GlobalStore.state.disciplines = (res.data.disciplines) ? [...res.data.disciplines] : []
          GlobalStore.state.paymenttypes = (res.data.paymenttypes) ? [...res.data.paymenttypes] : []
          GlobalStore.state.gallery = (res.data.gallery) ? [...res.data.gallery] : []
          GlobalStore.state.calzoom = (res.data.calzoom) ? [...res.data.calzoom] : []

          if (showall) {
            GlobalStore.state.newstosent = (res.data.newstosent) ? [...res.data.newstosent] : []
            GlobalStore.state.mailinglist = (res.data.mailinglist) ? [...res.data.mailinglist] : []
            GlobalStore.state.mypage = (res.data.mypage) ? [...res.data.mypage] : []
          }

          // console.log('res.data.myuser', res.data.myuser)
          if (res.data.myuser) {
            UserStore.mutations.authUser(res.data.myuser)

            UserStore.mutations.updateLocalStorage(res.data.myuser)
          } else {
            // User not exist !!

          }

          const islogged = localStorage.getItem(tools.localStorage.username)
          console.log('islogged', islogged)

          CalendarStore.state.editable = UserStore.state.isAdmin || UserStore.state.isManager || UserStore.state.isTutor
          if (res.data.myuser === null) {
            if (islogged) {
              // Fai Logout
              console.log('Fai Logout', 'islogged', islogged)
              UserStore.actions.logout()
              GlobalStore.state.RightDrawerOpen = true
              return false
            }
          }

        }

        return true

      })
      .catch((error) => {
        console.log('error dbLoad', error)
        // UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

  }

  async function sendEmailTest(context, { previewonly }) {
    const usertosend = {
      locale: tools.getLocale(),
      previewonly
    }
    console.log(usertosend)

    return await Api.SendReq('/news/testemail', 'POST', usertosend)
      .then((res) => {
        return res
      })
  }

  function isMyLang(rec) {
    if (!rec.lang)
      return true

    return (rec.lang === tools.getLocale(false) || tools.getLocale() === '')
  }

  async function addDynamicPages(context) {

    const arrpagesroute: IListRoutes[] = []
    for (const page of state.mypage) {
      if (page.active) {
        // console.log('page', page.lang)
        if (isMyLang(page)) {
          // console.log('page', page.lang, 'OK')
          arrpagesroute.push({
            active: true,
            order: page.order,
            lang: page.lang,
            path: '/' + page.path,
            name: undefined,
            text: page.title,
            materialIcon: page.icon,
            component: () => import('@/root/mypage/mypage.vue'),
            inmenu: page.inmenu,
            infooter: page.infooter,
            onlyif_logged: page.onlyif_logged,
            level_child: page.l_child,
            level_parent: page.l_par,
          })
        }
      }
    }

    const last = {
      active: true,
      order: 10000,
      path: '*',
      materialIcon: 'fas fa-calendar-plus',
      name: 'otherpages.error404def',
      component: () => import('@/root/My404page/My404page.vue'),
      inmenu: false,
      infooter: false
    }

    const sito_offline = {
      active: true,
      order: 20,
      path: '/sito_offline',
      materialIcon: 'home',
      name: 'otherpages.sito_offline',
      component: () => import('@/rootgen/sito_offline/sito_offline.vue'),
      inmenu: true,
      infooter: true
    }

    if (!tools.sito_online(false)) {
      static_data.routes = [sito_offline, last]
    } else {
      static_data.routes = [...static_data.baseroutes, ...arrpagesroute, last]
    }

    // Sort array
    static_data.routes = static_data.routes.sort((a, b) => a.order - b.order)

    if (tools.sito_online(false)) {
      router.addRoutes([...arrpagesroute, last])
    } else {
      router.addRoutes([sito_offline, last])
      this.$router.replace('/sito_offline')
    }
  }

  async function sendFile(context, formdata) {
    try {
      const { data } = await Api.postFormData('/upload', formdata)
      console.log(data)

    } catch (e) {
      console.log('Error sendFile: ', e)
    }
  }

  export const actions = {
    setConta: b.dispatch(setConta),
    createPushSubscription: b.dispatch(createPushSubscription),
    loadAfterLogin: b.dispatch(loadAfterLogin),
    loadSite: b.dispatch(loadSite),
    clearDataAfterLogout: b.dispatch(clearDataAfterLogout),
    clearDataAfterLoginOnlyIfActiveConnection: b.dispatch(clearDataAfterLoginOnlyIfActiveConnection),
    prova: b.dispatch(prova),
    saveCfgServerKey: b.dispatch(saveCfgServerKey),
    checkUpdates: b.dispatch(checkUpdates),
    saveFieldValue: b.dispatch(saveFieldValue),
    callFunz: b.dispatch(callFunz),
    askFunz: b.dispatch(askFunz),
    sendPushNotif: b.dispatch(sendPushNotif),
    loadTable: b.dispatch(loadTable),
    saveTable: b.dispatch(saveTable),
    DeleteRec: b.dispatch(DeleteRec),
    DeleteFile: b.dispatch(DeleteFile),
    sendEmailTest: b.dispatch(sendEmailTest),
    DuplicateRec: b.dispatch(DuplicateRec),
    InviaMsgADonatori: b.dispatch(InviaMsgADonatori),
    InviaMsgAFlotta: b.dispatch(InviaMsgAFlotta),
    GetArrNavi: b.dispatch(GetArrNavi),
    GetMsgTemplates: b.dispatch(GetMsgTemplates),
    GetNave: b.dispatch(GetNave),
    GetArrDoniNavi: b.dispatch(GetArrDoniNavi),
    GetFlotta: b.dispatch(GetFlotta),
    GetFlotte: b.dispatch(GetFlotte),
    GetData: b.dispatch(GetData),
    addDynamicPages: b.dispatch(addDynamicPages)
  }

}

const stateGetter = b.state()

// Module
const GlobalModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default GlobalModule
