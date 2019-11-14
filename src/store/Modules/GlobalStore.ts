import { ICfgServer, IConfig, IGlobalState, IListRoutes, IMenuList, StateConnection } from 'model'
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
  settings: [],
  disciplines: [],
  autoplaydisc: 8000
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

  const getmenu = b.read((state) => {
    // console.log('getmenu', cfgrouter.getmenu())

    state.menulinks = {
      Dashboard: {
        routes: cfgrouter.getmenu(),
        show: true
      }
    }

    return state.menulinks

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
    else if (table === 'bookings')
      return CalendarStore.state.bookedevent
    else if (table === 'users')
      return UserStore.state.usersList
    else if (table === 'sendmsgs')
      return MessageStore.state.last_msgs
    else if (table === 'settings')
      return UserStore.state.settings
    else if (table === 'permissions')
      return UserStore.state.permissionsList
    else
      return null

  }, 'getListByTable')

  const getValueSettingsByKey = b.read((mystate: IGlobalState) => (key): any => {
    const myrec = mystate.settings.find((rec) => rec.key === key)
    if (!!myrec) {
      if (myrec.type === tools.FieldType.date)
        return myrec.value_date
      if (myrec.type === tools.FieldType.number)
        return myrec.value_num
      else
        return myrec.value_str
    } else {
      return ''
    }

  }, 'getValueSettingsByKey')

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

    get t() {
      return t()
    },

    get isOnline() {
      // console.log('*********************** isOnline')
      return state.stateConnection === 'online'
    },

    get isNewVersionAvailable() {
      // console.log('state.cfgServer', state.cfgServer)
      const serversrec = state.cfgServer.find((x) => x.chiave === tools.SERVKEY_VERS)
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
            console.log('key', value, myrec[key])
            myrec[key] = value
          }
        }
      }
    } catch (e) {
      console.error(e)
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
    UpdateValuesInMemory: b.commit(UpdateValuesInMemory)
  }

}

namespace Actions {
  async function setConta(context, num: number) {
    Mutations.mutations.setConta(num)
  }

  function createPushSubscription(context) {
    console.log('createPushSubscription')

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

    // console.log('createPushSubscription')

    let reg
    const mykey = process.env.PUBLICKEY_PUSH
    const mystate = state
    return navigator.serviceWorker.ready
      .then((swreg) => {
        reg = swreg
        return swreg.pushManager.getSubscription()
      })
      .then((subscription) => {
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
    if (true) {
      return
    }

    if (!newSub) {
      return
    }

    if (UserStore.getters.isUserInvalid) {
      return
    }

    // console.log('saveSubscriptionToServer: ', newSub)
    // console.log('context', context)

    let options = null

    // If is not already stored in DB, then show the message to the user.
    if (!state.wasAlreadySubscribed) {
      options = {
        title: translate('notification.title_subscribed'),
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
    // console.log('loadAfterLogin')
    actions.clearDataAfterLoginOnlyIfActiveConnection()

    await Actions.actions.loadSite()

    state.arrConfig = await globalroutines(null, 'readall', 'config', null)
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

        if (res.data.permissionsList) {
          UserStore.state.permissionsList = res.data.permissionsList
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
    console.log('saveFieldValue', mydata)

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

  async function loadSite(context) {
    // console.log('CalendarStore: loadAfterLogin')
    // Load local data
    const showall = UserStore.state.isAdmin || UserStore.state.isManager ? '1' : '0'

    const myuserid = (UserStore.state.my._id) ? UserStore.state.my._id : '0'

    CalendarStore.state.editable = false

    return await Api.SendReq('/loadsite/' + myuserid + '/' + process.env.APP_ID + '/' + showall, 'GET', null)
      .then((res) => {
        CalendarStore.state.bookedevent = (res.data.bookedevent) ? res.data.bookedevent : []
        CalendarStore.state.eventlist = (res.data.eventlist) ? res.data.eventlist : []
        CalendarStore.state.operators = (res.data.operators) ? res.data.operators : []
        CalendarStore.state.wheres = (res.data.wheres) ? res.data.wheres : []
        CalendarStore.state.contribtype = (res.data.contribtype) ? res.data.contribtype : []
        GlobalStore.state.settings = (res.data.settings) ? [...res.data.settings] : []
        GlobalStore.state.disciplines = (res.data.disciplines) ? [...res.data.disciplines] : []

        CalendarStore.state.editable = UserStore.state.isAdmin || UserStore.state.isManager

      })
      .catch((error) => {
        console.log('error dbLoad', error)
        // UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

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
    loadTable: b.dispatch(loadTable),
    saveTable: b.dispatch(saveTable),
    DeleteRec: b.dispatch(DeleteRec),
    DuplicateRec: b.dispatch(DuplicateRec)
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
