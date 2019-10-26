import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '../../store/Modules/toolsext'
import { MessageStore, UserStore } from '../../store/Modules'
import globalroutines from '../../globalroutines/index'
import { tools } from '../../store/Modules/tools'

import { IChat, IMessage, IUserState, MsgDefault, StatusMessage } from '../../model'
import { Getter } from 'vuex-class'
import { IMsgUsers } from '../../model/MessageStore'
import MixinUsers from '../../mixins/mixin-users'

import { scroll } from 'quasar'

const { getScrollTarget, setScrollPosition } = scroll

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

const namespace = 'MessageModule'

@Component({
  name: 'Messages',
  mixins: [MixinUsers],
  components: {}
})

export default class Messages extends Vue {
  public $t
  public $q
  public mydrawer = true
  public miniState = false
  public usernameloading: string = ''
  public widthdrawer = 300
  public chatsel: IChat = {
    username: '',
    lasttimeActive: new Date()
  }
  public mytexttosend: string = ''
  public loading: boolean = false

  // public users_msg_saved: IMsgUsers[] = []

  @Getter('getlasts_messages', { namespace })
  public lasts_messages: (state: IUserState) => IMessage[]

  @Watch('$route.params.un')
  public changeusername() {
    if (this.$route.params.un === undefined || this.$route.params.un === ':un') {
      this.usernameloading = this.getLastUserChatted()
    } else {
      this.usernameloading = this.$route.params.un
    }

    if (!this.miniState && tools.isMobile()) {
      this.miniState = true
    }

    if (this.usernameloading) {
      // Retrieve last msgs data from the server
      this.refreshdata(this.usernameloading)
    }
  }

  get styletextbar() {

    let mystr = ''

    if (this.mydrawer) {
      if (!this.miniState)
        mystr = `left: ${this.widthdrawer}px;`
      else
        mystr = `left: 57px;`
    } else {
      mystr = 'left: 0;'
    }

    // console.log('tools.getwidth', tools.getwidth)

    mystr += ` width: ${tools.getwidth(this) - this.widthdrawer - 40 - 300}px; `

    return mystr
  }

  public scrollToElement(el) {
    const target = getScrollTarget(el)
    const offset = el.offsetTop
    const duration = 1000
    // console.log('target', target, 'offset', offset, 'duration', duration)
    setScrollPosition(target, offset, duration)
  }

  public refreshdata(username: string) {
    this.loading = true

    this.chatsel.username = ''

    return MessageStore.actions.updateMsgDataFromServer({
      username,
      lastdataread: this.getlastdataread(username)
    }).then((ris) => {
      this.usernameloading = username
      this.chatsel.username = username
      this.loading = false

      const element = document.getElementById('last')
      this.scrollToElement(element)

      // this.changemsgs('', '')

    }).catch((err) => {
      this.loading = false
    })
  }

  public showNotif(msgcode) {
    tools.showNotif(this.$q, this.$t(msgcode))
  }

  public getMyUsername() {
    return UserStore.state.my.username
  }

  public drawerClick(e) {
    // if in "mini" state and user
    // click on drawer, we switch it to "normal" mode
    if (this.miniState) {
      this.miniState = false

      // notice we have registered an event with capture flag;
      // we need to stop further propagation as this click is
      // intended for switching drawer to "normal" mode only
      e.stopPropagation()
    }
  }

  get getheight() {
    // return height()
    return this.$q.screen.height - 43 // .toolbar
  }

  public isMenuActive(username) {
    return this.chatsel.username === username
  }

  public getLastUserChatted() {
    const lastmsg: IMessage = MessageStore.getters.getlasts_messages().slice(-1)[0]
    console.log('lastmsg', lastmsg)
    if (lastmsg) {
      return (lastmsg.origin.username !== this.getMyUsername()) ? lastmsg.origin.username : lastmsg.origin.username
    } else {
      return ''
    }
  }

  public selChat(mymsg: IMessage) {
    if (this.chatsel.username !== mymsg.dest.username)
      this.$router.replace('/messages/' + mymsg.dest.username)
    else {
      // refresh

      this.refreshdata(this.chatsel.username)
    }
  }

  // @Watch('MessageStore.state.users_msg', { immediate: false, deep: true })
  // public changemsgs(value: string, oldValue: string) {
  //   console.log('changemsgs')
  //
  //   const myrec = MessageStore.state.users_msg.find((rec) => rec.username === this.usernameloading)
  //
  //   console.log('myrec', myrec)
  //
  //   if (this.users_msg_saved.length < 0)
  //     this.users_msg_saved = []
  //
  //   this.users_msg_saved[this.usernameloading] = {...myrec}
  //   console.log('this.users_msg_saved', this.users_msg_saved[this.usernameloading])
  // }

  public msgchat(username): IMsgUsers {
    // Get msg for this chat
    return MessageStore.state.users_msg.find((rec) => rec.username === username)
    // return this.users_msg_saved[username]
  }

  public msgchat_records(): IMessage[] {
    const myrec = this.msgchat(this.chatsel.username)
    // console.log('msgchat_records', myrec)
    // Get msg for this chat
    return (myrec) ? myrec.msgs : []
  }

  public getlastdataread(username): any {
    const myrec = this.msgchat(username)
    // Get msg for this chat
    const lastdata = (myrec) ? myrec.lastdataread : tools.getLastDateReadReset()
    console.table(myrec)
    let mydate = ''
    if (!tools.isIsoDate(lastdata))
      mydate = lastdata.toISOString()
    else
      return lastdata

    // console.log('getlastdataread', mydate)
    return mydate
  }

  public sendMsg() {
    const self = this

    const data: IMessage = {
      dest: {
        idapp: process.env.APP_ID,
        username: this.chatsel.username
      },
      message: this.mytexttosend
    }
    data.dest.username = this.chatsel.username
    data.message = this.mytexttosend

    this.mytexttosend = ''

    MessageStore.actions.SendMsgEvent(data).then((ris) => {
      data.status = StatusMessage.Sending

      const element = document.getElementById('last')
      this.scrollToElement(element)

      if (!ris)
        tools.showNegativeNotif(self.$q, self.$t('cal.sendmsg_error'))

      // tools.showPositiveNotif(self.$q, self.$t('cal.sendmsg_sent'))
      // else
    })
  }

  public loadMorePosts() {
    console.log('loadMorePosts')
  }

  public myonScroll({ target: { scrollTop, clientHeight, scrollHeight }}) {
    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMorePosts()
    }
  }

  public created() {

    this.changeusername()
  }

}
