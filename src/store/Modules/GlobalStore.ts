import { IGlobalState, StateConnection } from 'model'
import { storeBuilder } from './Store/Store'

import Vue from 'vue'

import translate from './../../globalroutines/util'

import urlBase64ToUint8Array from '../../js/utility'

import messages from '../../statics/i18n'
import { UserStore } from '@store'
import globalroutines from './../../globalroutines/index'

const allTables = ['todos', 'sync_todos', 'sync_todos_patch', 'delete_todos', 'config', 'swmsg']

const state: IGlobalState = {
  conta: 0,
  isSubscribed: false,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  leftDrawerOpen: true,
  stateConnection: 'online',
  category: 'personal',
  posts: [],
  listatodo: [
    {namecat: 'personal', description: 'personal'},
    {namecat: 'work', description: 'work'},
    {namecat: 'shopping', description: 'shopping'}
    ]
}

const b = storeBuilder.module<IGlobalState>('GlobalModule', state)

// Getters
namespace Getters {

  const conta = b.read(state => state.conta, 'conta')
  const listatodo = b.read(state => state.listatodo, 'listatodo')
  const category = b.read(state => state.category, 'category')

  export const getters = {
    get conta() {
      return conta()
    },

    get listaTodo() {
      return listatodo()
    },

    get category() {
      return category()
    }
  }
}

namespace Mutations {

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

  export const mutations = {
    setConta: b.commit(setConta),
    setleftDrawerOpen: b.commit(setleftDrawerOpen),
    setCategorySel: b.commit(setCategorySel),
    setStateConnection: b.commit(setStateConnection)
  }

}

namespace Actions {
  async function setConta(context, num: number) {
    Mutations.mutations.setConta(num)
  }

  function createPushSubscription(context) {
    if (!('serviceWorker' in navigator)) {
      return
    }

    console.log('createPushSubscription')

    let reg
    const mykey = process.env.PUBLICKEY_PUSH
    const mystate = state
    navigator.serviceWorker.ready
      .then(function (swreg) {
        reg = swreg
        return swreg.pushManager.getSubscription()
      })
      .then(function (subscription) {
        mystate.isSubscribed = !(subscription === null)

        if (mystate.isSubscribed) {
          console.log('User is already Subscribed!')
        } else {
          // Create a new subscription
          let convertedVapidPublicKey = urlBase64ToUint8Array(mykey)
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          })
        }
      })
      .then(function (newSub) {
        // console.log('newSub', newSub)
        if (newSub) {
          saveNewSubscriptionToServer(context, newSub)
          mystate.isSubscribed = true
        }
        return null
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  // Calling the Server to Save in the MongoDB the Subscriber
  function saveNewSubscriptionToServer(context, newSub) {
    console.log('saveSubscriptionToServer: ', newSub)
    console.log('context', context)

    const options = {
      title: translate('notification.title_subscribed'),
      content: translate('notification.subscribed'),
      openUrl: '/'
    }

    let myres = {
      options: { ...options },
      subs: newSub,
      others: {
        userId: UserStore.state.userId
      }
    }

    return fetch(process.env.MONGODB_HOST + '/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(myres)

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

    // let msg = t('notification.title_subscribed')

    // console.log('msg', msg)

  }

  async function clearDataAfterLogout (context) {

    // Clear all data from the IndexedDB
    allTables.forEach(table => {
      globalroutines(null, 'clearalldata', table, null)
    })

  }

  async function loadAfterLogin (context) {
    actions.clearDataAfterLogout()
  }


  export const actions = {
    setConta: b.dispatch(setConta),
    createPushSubscription: b.dispatch(createPushSubscription),
    loadAfterLogin: b.dispatch(loadAfterLogin),
    clearDataAfterLogout: b.dispatch(clearDataAfterLogout),
    prova: b.dispatch(prova)
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
