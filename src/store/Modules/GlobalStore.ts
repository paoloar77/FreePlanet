import { ICfgServer, IConfig, IGlobalState, IListRoutes, IMenuList, StateConnection } from 'model'
import { storeBuilder } from './Store/Store'

import Vue from 'vue'

import translate from './../../globalroutines/util'

import urlBase64ToUint8Array from '../../js/utility'

import Api from '@api'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'
import { tools } from '@src/store/Modules/tools'
import * as ApiTables from '@src/store/Modules/ApiTables'
import { GlobalStore, Projects, Todos, UserStore } from '@store'
import messages from '../../statics/i18n'
import globalroutines from './../../globalroutines/index'
import { RouteNames } from '@src/router/route-names'

let stateConnDefault = 'online'

getstateConnSaved()
  .then((conn) => {
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
  arrConfig: []
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

function addRoute(myarr, values: IListRoutes) {
  myarr.push(values)
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
    console.log('getmenu')

    const arrlista = GlobalStore.state.listatodo
    const lista: IListRoutes[] = []

    arrlista.forEach((elem: IMenuList) => {
      const item: IListRoutes = {
        faIcon: 'fa fa-list-alt',
        materialIcon: 'todo',
        name: 'pages.' + elem.description,
        route: '/todo/' + elem.nametranslate
      }
      lista.push(item)
    })

    const SHOW_PROJINTHEMENU = false

    let arrlistafavourite = []
    let arrlistaprojtutti = []
    let arrlistaprojmiei = []
    if (SHOW_PROJINTHEMENU) {
      arrlistaprojtutti = Projects.getters.listaprojects(false, false)
      arrlistaprojmiei = Projects.getters.listaprojects(true, false)
      arrlistafavourite = Projects.getters.listaprojects(false, true)
    }

    const arrMenu: IMenuList[] = []

    // PROGETTI -> FAVORITI :
    if (arrlistafavourite.length > 0) {
      arrMenu.push({
        icon: '',
        nametranslate: 'pages.' + RouteNames.favouriteprojects,
        urlroute: RouteNames.favouriteprojects,
        level_parent: 0.0,
        level_child: 0.5,
        routes2: arrlistafavourite,
        idelem: ''
      })
    }

    // PROGETTI -> CONDIVISI :
    arrMenu.push({
      icon: '',
      nametranslate: 'pages.' + RouteNames.projectsshared,
      urlroute: 'projects',
      level_parent: 0.0,
      level_child: 0.5,
      routes2: arrlistaprojtutti,
      idelem: process.env.PROJECT_ID_MAIN
    })

    // PROGETTI -> PERSONALI :
    arrMenu.push({
      icon: '',
      nametranslate: 'pages.' + RouteNames.myprojects,
      urlroute: 'myprojects',
      level_parent: 0.0,
      level_child: 0.5,
      routes2: arrlistaprojmiei,
      idelem: process.env.PROJECT_ID_MAIN
    })

    const listaprojectMenu: IListRoutes[] = tools.convertMenuListInListRoutes(arrMenu)

    const arrroutes: IListRoutes[] = []

    addRoute(arrroutes, { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home' })   // HOME

    if (!process.env.PROD) {
      addRoute(arrroutes, {
        route: '/todo', faIcon: 'fa fa-list-alt', materialIcon: 'format_list_numbered', name: 'pages.Todo',
        routes2: lista,
        level_parent: 0.5,
        level_child: 0.5
      })

    }

    const myarrproj = []
    for (const myitem of listaprojectMenu) {
      addRoute(myarrproj, myitem)
    }

    addRoute(arrroutes, {
      route: '', faIcon: 'fa fa-list-alt', materialIcon: 'next_week', name: 'pages.projects',
      routes2: myarrproj,
      level_parent: 0.0,
      level_child: 0.5
    })

    console.log('arrroutes', arrroutes)
    console.log('listaprojectMenu', listaprojectMenu)
    // console.log('arrlistaprojmiei', arrlistaprojmiei)

    if (UserStore.state.isAdmin) {
      addRoute(arrroutes, {
        route: '/category',
        faIcon: 'fa fa-list-alt',
        materialIcon: 'category',
        name: 'pages.Category',
        level_parent: 0.0,
        level_child: 0.0
      })
      addRoute(arrroutes, {
        route: '/admin/cfgserv',
        faIcon: 'fa fa-database',
        materialIcon: 'event_seat',
        name: 'pages.Admin',
        level_parent: 0.0,
        level_child: 0.0
      })
      addRoute(arrroutes, {
        route: '/admin/testp1/par1',
        faIcon: 'fa fa-database',
        materialIcon: 'restore',
        name: 'pages.Test1',
        level_parent: 0.0,
        level_child: 0.0
      })
      addRoute(arrroutes, {
        route: '/admin/testp1/par2',
        faIcon: 'fa fa-database',
        materialIcon: 'restore',
        name: 'pages.Test2',
        level_parent: 0.0,
        level_child: 0.0
      })
    }

    state.menulinks = {
      Dashboard: {
        routes: arrroutes,
        show: true
      }
    }

    return state.menulinks

    // console.log('state.menulinks', state.menulinks)

  }, 'getmenu')

  const t = b.read((state) => (params) => {
    const msg = params.split('.')
    const lang = UserStore.state.lang

    const stringa = messages[lang]

    let ris = stringa
    msg.forEach((param) => {
      ris = ris[param]
    })

    return ris
  }, 't')

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
    setShowType: b.commit(setShowType)
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

    // console.log('createPushSubscription')

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
          const convertedVapidPublicKey = urlBase64ToUint8Array(mykey)
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
    if (!newSub) {
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
        userId: UserStore.state.userId,
        access: UserStore.state.tokens[0].access
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

    await deleteSubscriptionToServer(context)

  }

  async function clearDataAfterLoginOnlyIfActiveConnection(context) {

  }

  async function loadAfterLogin(context) {
    console.log('loadAfterLogin')
    actions.clearDataAfterLoginOnlyIfActiveConnection()

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

    // if (UserStore.state.userId === '')
    //   return false // Login not made

    state.networkDataReceived = false

    const ris = await Api.SendReq('/checkupdates', 'GET', null)
      .then((res) => {
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
      .catch((error) => {
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
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default GlobalModule
