import Api from '@api'
import { storeBuilder } from './Store/Store'

import { serv_constants } from '../Modules/serv_constants'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore, UserStore, Todos, Projects, CalendarStore } from '@store'

import { IMessage, IMessageState, StatusMessage } from '../../model'
import { tools } from '@src/store/Modules/tools'
import { MsgDefault } from '@src/model'
import { shared_consts } from '@src/common/shared_vuejs'

// State
const state: IMessageState = {
  last_msgs: [],
  users_msg: []
  // last_update: []
}

const b = storeBuilder.module<IMessageState>('MessageModule', state)

namespace Getters {

  const getlasts_messages = b.read((mystate: IMessageState) => (): IMessage[] => {
    const ctrec = (mystate.last_msgs) ? mystate.last_msgs.slice(0, 5) : []
    // const ctrec = (mystate.msgs) ? mystate.msgs.slice().reverse().slice(0, 5) : []
    return (ctrec)

  }, 'getlasts_messages')

  const getnumMsgUnread = b.read((mystate: IMessageState) => () => {
    return mystate.last_msgs.filter((msg) => !msg.read).length
  }, 'getnumMsgUnread')

  export const getters = {
    get getlasts_messages() {
      return getlasts_messages()
    },
    get getnumMsgUnread() {
      return getnumMsgUnread()
    }
  }

}

namespace Mutations {
  export const mutations = {
  }
}

function setMsg(arrmsg: IMessage[], username) {
  // console.log('arrmsg', arrmsg)
  if (arrmsg.length > 0) {
    let users_msg = state.users_msg.find((rec) => rec.username === username)
    if (!users_msg) {
      state.users_msg.push({ username, msgs: [] })
      users_msg = state.users_msg.find((rec) => rec.username === username)
    }
    users_msg.msgs.push(...arrmsg)
    // console.table(users_msg.msgs)

    // users_msg.msgs = tools.getUnique(users_msg.msgs, '_id')
    // console.table(users_msg.msgs)

    if (users_msg.msgs) {
      let userother = users_msg.msgs.slice(-1)[0].dest.username
      if (userother === UserStore.state.my.username)
        userother = users_msg.msgs.slice(-1)[0].origin.username

      let index = state.last_msgs.findIndex((rec) => (rec.dest.username === userother) || (rec.origin.username === userother))
      if (index >= 0) {
        // Update last message
        state.last_msgs[index] = users_msg.msgs.slice(-1)[0]
      } else {
        state.last_msgs.push(users_msg.msgs.slice(-1)[0])
        index = state.last_msgs.findIndex((rec) => (rec.dest.username === userother) || (rec.origin.username === userother))
      }
      if (state.last_msgs[index])
        users_msg.lastdataread = state.last_msgs[index].datemsg
      else
        users_msg.lastdataread = tools.getLastDateReadReset()

    } else {
      users_msg.lastdataread = tools.getLastDateReadReset()
    }

    // console.log('RICeVUTO', arrmsg, 'lastdataread', users_msg.lastdataread)
    // console.log('state.users_msg', users_msg)
  }
}

namespace Actions {

  async function updateMsgDataFromServer(context, { username, lastdataread } ) {
    // console.log('updateMsgDataFromServer', username, lastdataread)

    return await Api.SendReq(`/sendmsg/${username}/${lastdataread}/${process.env.APP_ID}`, 'GET', null)
      .then((res) => {
        // console.log('res', res)
        if (res.status === 200) {
          setMsg(res.data.arrmsg, username)
          return true
        }
        return false
      })
      .catch((error) => {
        console.error(error)
        return false
      })

  }

  async function SendMsgEvent(context, msg: IMessage) {
    console.log('SendMsgEvent', msg)

    const data: IMessage = { ...MsgDefault, ...msg}

    data.source.page = ''
    data.idapp = process.env.APP_ID
    data.origin.idapp = process.env.APP_ID
    data.origin.username = UserStore.state.my.username
    data.datemsg = tools.getDateNow()
    data.status = StatusMessage.WaitingToSend
    // Options
    data.options = tools.SetBit(data.options, shared_consts.MessageOptions.Notify_ByEmail)
    data.options = tools.SetBit(data.options, shared_consts.MessageOptions.Notify_ByPushNotification)

    // console.log('DOPO:')
    // console.table(data)

    return await Api.SendReq('/sendmsg', 'POST', data)
      .then((res) => {
        // console.log('res', res)
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            data._id = res.data.id

            const myarr = []
            myarr.push(data)

            setMsg(myarr, data.dest.username)
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

  export const actions = {
    updateMsgDataFromServer: b.dispatch(updateMsgDataFromServer),
    SendMsgEvent: b.dispatch(SendMsgEvent)
  }

}

const stateGetter = b.state()

// Module
const MessageModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default MessageModule
