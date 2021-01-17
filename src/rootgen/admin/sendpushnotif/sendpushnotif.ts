import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { CGridTableRec } from '@components'
import { CMyPage } from '../../../components/CMyPage/index'
import { fieldsTable, func } from '@src/store/Modules/fieldsTable'

import { shared_consts } from '@src/common/shared_vuejs'
import { GlobalStore, UserStore } from '../../../store/Modules'
import { tools } from '@src/store/Modules/tools'

@Component({
  components: { CMyPage }
})

export default class Sendpushnotif extends Vue {
  public $t
  public incaricamento: boolean = false

  public title: string = ''
  public content: string = ''
  public openUrl: string = ''
  public openUrl2: string = ''
  public opz1: string = ''
  public opz2: string = ''
  public tag: string = ''
  public actiontype: number = shared_consts.TypeMsg_Actions.NORMAL
  public destination: number = shared_consts.TypeMsg.SEND_TO_ALL

  public created() {
    this.title = this.$t('ws.sitename')
    this.openUrl = '/'
    this.openUrl2 = ''
    this.tag = 'msg'
  }

  get shared_consts() {
    return shared_consts
  }

  public async SendMsg(params) {
    this.$q.dialog({
      message: this.$t('dialog.continue') + ' ' + params.content + ' ?',
      cancel: {
        label: this.$t('dialog.cancel')
      },
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      title: params.title
    }).onOk(async () => {

      this.incaricamento = true
      this.$q.loading.show({ message: this.$t('otherpages.update') })

      const ris = await GlobalStore.actions.sendPushNotif({ params })

      if (!!ris.msg)
        tools.showPositiveNotif(this.$q, ris.msg)

      this.$q.loading.hide()

      this.incaricamento = false

    })
  }

  public SendMsgToParam(typemsg) {
    const param = {
      typemsg,
      title: this.title,
      content: this.content,
      openUrl: this.openUrl,
      openUrl2: this.openUrl2,
      tag: this.tag,
      actions: []
    }

    param.actions = []

    if (this.actiontype === shared_consts.TypeMsg_Actions.YESNO) {
      param.actions = [
        { action: 'confirm', title: 'Si', icon: '/statics/icons/opz1-icon-96x96.png' },
        { action: 'cancel', title: 'No', icon: '/statics/icons/opz2-icon-96x96.png' }
      ]
    } else if (this.actiontype === shared_consts.TypeMsg_Actions.OPZ1_2) {
      param.actions = [
        { action: 'opz1', title: this.opz1, icon: '/statics/icons/opz1-icon-96x96.png' },
        { action: 'opz2', title: this.opz2, icon: '/statics/icons/opz2-icon-96x96.png' }
      ]
    }

    //   action: A DOMString identifying a user action to be displayed on the notification.
    //   title: A DOMString containing action text to be shown to the user.
    //   icon: A USVString containing the URL of an icon to display with the action.

    return this.SendMsg(param)
  }

  public SendMsgToAll() {

    this.SendMsgToParam(this.destination)
  }
}
