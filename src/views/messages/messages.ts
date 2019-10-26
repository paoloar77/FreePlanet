import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '../../store/Modules/toolsext'
import { MessageStore, UserStore } from '../../store/Modules'
import globalroutines from '../../globalroutines/index'
import { tools } from '../../store/Modules/tools'
import MixinUsers from '../../mixins/mixin-users'
import { IChat, IMessage, IUserState } from '../../model'
import { Getter } from 'vuex-class'
import { IMsgUsers } from '../../model/MessageStore'

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

const namespace = 'MessageModule'

@Component({
  name: 'Messages',
  mixins: [MixinUsers],
  components: {  }
})

export default class Messages extends Vue {
  public $t
  public $q
  public mydrawer = true
  public miniState = false
  public chatsel: IChat = {
    username: '',
    lasttimeActive: new Date()
  }

  @Getter('getlasts_messages', { namespace })
  public lasts_messages: (state: IUserState) => IMessage[]

  public showNotif(msgcode) {
    tools.showNotif(this.$q, this.$t(msgcode))
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

  @Watch('$route.params.un')
  public changeusername() {
    this.chatsel.username = this.$route.params.un
    if (!this.miniState && tools.isMobile()) {
      this.miniState = true
    }

    // Retrieve last msgs data from the server
    MessageStore.actions.updateMsgDataFromServer({username: this.chatsel.username, lastdataread: this.getlastdataread() } )
  }

  public selChat(mymsg: IMessage) {
    this.$router.replace('/messages/' + mymsg.dest.username)
  }

  public msgchat(): IMsgUsers {
    // Get msg for this chat
    return MessageStore.state.users_msg.find((rec) => rec.username === this.chatsel.username)
  }

  public msgchat_records(): IMessage[] {
    const myrec = this.msgchat()
    console.log('myrec', myrec)
    // Get msg for this chat
    return (myrec) ? myrec.msgs : []
  }

  public getlastdataread(): Date {
    const myrec = this.msgchat()
    // Get msg for this chat
    return (myrec) ? tools.gettimestampByDate(myrec.lastdataread) : tools.getLastDateReadReset()
  }

  public getMsgText(msg: IMessage) {
    return [msg.message]
  }

  public created() {

    this.changeusername()
  }

}
