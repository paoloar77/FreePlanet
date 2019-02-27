import { ICfgServer, IGlobalState, StateConnection } from 'model'
import { storeBuilder } from './Store/Store'

import Vue from 'vue'

import translate from './../../globalroutines/util'

import urlBase64ToUint8Array from '../../js/utility'

import messages from '../../assets/i18n'
import { GlobalStore, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import Api from '@api'
import { tools } from '@src/store/Modules/tools'

const allTables = ['todos', 'categories', 'sync_todos', 'sync_todos_patch', 'delete_todos', 'config', 'swmsg']
const allTablesAfterLogin = ['todos', 'categories', 'sync_todos', 'sync_todos_patch', 'delete_todos', 'config', 'swmsg']

async function getstateConnSaved() {
  const config = await globalroutines(null, 'readall', 'config', null)
  if (config.length > 1) {
    return config[1].stateconn
  } else {
    return 'online'
  }
}

let stateConnDefault = 'online'

getstateConnSaved()
  .then(conn => {
    stateConnDefault = conn
  })

const state: IGlobalState = {
  conta: 0,
  wasAlreadySubscribed: false,
  wasAlreadySubOnDb: false,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  leftDrawerOpen: true,
  stateConnection: stateConnDefault,
  networkDataReceived: false,
  cfgServer: [],
  testp1: { contatore: 0, mioarray: [] },
  category: 'personal',
  posts: [],
  listatodo: [
    { namecat: 'personal', description: 'personal' },
    { namecat: 'work', description: 'work' },
    { namecat: 'shopping', description: 'shopping' }
  ],
  connData: {
    uploading_server: 0,
    uploading_indexeddb: 0,
    downloading_server: 0,
    downloading_indexeddb: 0
  }
}


const b = storeBuilder.module<IGlobalState>('GlobalModule', state)

// Getters
namespace Getters {

  const conta = b.read(state => state.conta, 'conta')
  const listatodo = b.read(state => state.listatodo, 'listatodo')
  const category = b.read(state => state.category, 'category')

  const testpao1_getter_contatore = b.read(state => param1 => state.testp1.contatore + 100 + param1, 'testpao1_getter_contatore')
  const testpao1_getter_array = b.read(state => param1 => state.testp1.mioarray.filter(item => item).map(item => item.valore) , 'testpao1_getter_array')


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

    get isOnline() {
      console.log('*********************** isOnline')
      return state.stateConnection === 'online'
    },

    get isNewVersionAvailable() {
      console.log('state.cfgServer', state.cfgServer)
      const serversrec = state.cfgServer.find(x => x.chiave === tools.SERVKEY_VERS)
      console.log('Record ', serversrec)
      if (serversrec) {
        console.log('Vers Server ', serversrec.valore, 'Vers locale:', process.env.APP_VERSION)
        return serversrec.valore !== process.env.APP_VERSION
      } else
        return false
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

  function SetwasAlreadySubOnDb(state: IGlobalState, subscrib: boolean) {
    state.wasAlreadySubOnDb = subscrib
  }

  export const mutations = {
    setConta: b.commit(setConta),
    setleftDrawerOpen: b.commit(setleftDrawerOpen),
    setCategorySel: b.commit(setCategorySel),
    setStateConnection: b.commit(setStateConnection),
    SetwasAlreadySubOnDb: b.commit(SetwasAlreadySubOnDb),
    setPaoArray: b.commit(setPaoArray),
    setPaoArray_Delete: b.commit(setPaoArray_Delete),
    NewArray: b.commit(NewArray)
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
      .then(function (swreg) {
        reg = swreg
        return swreg.pushManager.getSubscription()
      })
      .then(function (subscription) {
        mystate.wasAlreadySubscribed = !(subscription === null)

        if (mystate.wasAlreadySubscribed) {
          // console.log('User is already SAVED Subscribe on DB!')
          // return null
          return subscription
        } else {
          // Create a new subscription
          console.log('Create a new subscription')
          let convertedVapidPublicKey = urlBase64ToUint8Array(mykey)
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          })
        }
      })
      .then(function (newSub) {
        saveNewSubscriptionToServer(context, newSub)
      })
      .catch(function (err) {
        console.log('ERR createPushSubscription:', err)
      })
  }

  // Calling the Server to Save in the MongoDB the Subscriber
  function saveNewSubscriptionToServer(context, newSub) {
    // If already subscribed, exit
    if (!newSub)
      return

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

    let myres = {
      options,
      subs: newSub,
      others: {
        userId: UserStore.state.userId,
        access: UserStore.state.tokens[0].access
      }
    }

    return Api.SendReq('/subscribe', 'POST', myres)
      .then(res => {
        state.wasAlreadySubscribed = true
        state.wasAlreadySubOnDb = true

        localStorage.setItem(tools.localStorage.wasAlreadySubOnDb, String(state.wasAlreadySubOnDb))
      })
      .catch(e => {
        console.log('Error during Subscription!', e)
      })
  }

  async function deleteSubscriptionToServer(context) {
    console.log('DeleteSubscriptionToServer: ')

    return await fetch(process.env.MONGODB_HOST + '/subscribe/del', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-auth': UserStore.state.x_auth_token
      }
    })

  }

  function t(params) {
    let msg = params.split('.')
    let lang = UserStore.state.lang

    let stringa = messages[lang]

    let ris = stringa
    msg.forEach(param => {
      ris = ris[param]
    })

    return ris
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
    for (const table of allTables) {
      await globalroutines(null, 'clearalldata', table, null)
    }

    if ('serviceWorker' in navigator) {
      // REMOVE ALL SUBSCRIPTION
      console.log('REMOVE ALL SUBSCRIPTION...')
      await navigator.serviceWorker.ready.then(function (reg) {
        console.log('... Ready')
        reg.pushManager.getSubscription().then(function (subscription) {
          console.log('    Found Subscription...')
          subscription.unsubscribe().then(function (successful) {
            // You've successfully unsubscribed
            console.log('You\'ve successfully unsubscribed')
          }).catch(function (e) {
            // Unsubscription failed
          })
        })
      })
    }

    await deleteSubscriptionToServer(context)

  }

  async function clearDataAfterLoginOnlyIfActiveConnection(context) {

    // if (Getters.getters.isOnline) {
    //   console.log('clearDataAfterLoginOnlyIfActiveConnection')
    //   // Clear all data from the IndexedDB
    //   allTablesAfterLogin.forEach(table => {
    //     globalroutines(null, 'clearalldata', table, null)
    //   })
    // }

  }


  async function loadAfterLogin(context) {
    actions.clearDataAfterLoginOnlyIfActiveConnection()
  }

  async function saveCfgServerKey(context, dataval: ICfgServer) {
    console.log('saveCfgServerKey dataval', dataval)

    let ris = await Api.SendReq('/admin/updateval', 'POST', { pairval: dataval })
      .then(res => {

      })

  }

  async function checkUpdates(context) {
    console.log('checkUpdates')

    // if (UserStore.state.userId === '')
    //   return false // Login not made

    state.networkDataReceived = false

    let ris = await Api.SendReq('/checkupdates', 'GET', null)
      .then(res => {
        state.networkDataReceived = true

        console.log('******* checkUpdates RES :', res.data.cfgServer)
        if (res.data.cfgServer) {
          state.cfgServer = [...res.data.cfgServer]
          console.log('res.data.cfgServer', res.data.cfgServer)
        }

        // console.log('**********  res', 'state.todos', state.todos, 'checkPending', checkPending)
        // After Login will store into the indexedDb...

        return res
      })
      .catch(error => {
        console.log('error checkUpdates', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

  }

  export const actions = {
    setConta: b.dispatch(setConta),
    createPushSubscription: b.dispatch(createPushSubscription),
    loadAfterLogin: b.dispatch(loadAfterLogin),
    clearDataAfterLogout: b.dispatch(clearDataAfterLogout),
    clearDataAfterLoginOnlyIfActiveConnection: b.dispatch(clearDataAfterLoginOnlyIfActiveConnection),
    prova: b.dispatch(prova),
    saveCfgServerKey: b.dispatch(saveCfgServerKey),
    checkUpdates: b.dispatch(checkUpdates)
  }

}

const stateGetter = b.state()

// Module
const GlobalModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}


export default GlobalModule
