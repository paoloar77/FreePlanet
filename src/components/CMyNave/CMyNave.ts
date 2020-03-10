import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'
import MixinNave from '../../mixins/mixin-nave'
import { CTitleBanner } from '../CTitleBanner'
import { UserStore } from '../../store/Modules'
import { lists } from '../../store/Modules/lists'
import translate from '../../globalroutines/util'

@Component({
  components: { CTitleBanner },
})

export default class CMyNave extends MixinNave {
  @Prop({ required: true }) public naveprop
  @Prop({ required: true }) public navi_partenzaprop: any[]
  public navi_partenza: any[]
  public $t
  public link_chat: string = ''
  public cosa: string = 'tragitto'
  public nave: any = null
  public numpercorso = 7
  public riga: number = 1
  public col: number = 1
  public rigadoni: number = 1
  public coldoni: number = 1
  public mediatore: any = {}

  public tragitto = [
    {
      ind: 7,
      color: 'purple',
      title_lang: 'dashboard.sognatore',
      extracl: ''
    },
    {
      ind: 6,
      color: 'indigo',
      title_lang: 'dashboard.pos6',
      extracl: 'extra'
    },
    {
      ind: 5,
      color: 'blue',
      title_lang: 'dashboard.pos5',
      extracl: 'extra'
    },
    {
      ind: 4,
      color: 'green',
      title_lang: 'dashboard.mediatore',
      extracl: ''
    },
    {
      ind: 3,
      color: 'yellow',
      title_lang: 'dashboard.pos3',
      extracl: 'extra'
    },
    {
      ind: 2,
      color: 'orange',
      title_lang: 'dashboard.pos2',
      extracl: 'extra'
    },
    {
      ind: 1,
      color: 'red',
      title_lang: 'dashboard.donatore',
      extracl: ''
    },
  ]

  public mounted() {
    this.nave = this.naveprop
    this.navi_partenza = this.navi_partenzaprop

    this.riga = tools.getValDb('riga', false, 1)
    this.col = tools.getValDb('col', false, 1)
    this.rigadoni = tools.getValDb('rigadoni', false, 1)
    this.coldoni = tools.getValDb('coldoni', false, 1)

    this.mediatore = this.getmediatore()

    if (!!this.mediatore) {
      this.link_chat = this.mediatore.link_chat
    }
  }

  public getNavePartByInd(ind) {
    if (!!this.navi_partenza[ind])
      return this.navi_partenza[ind].date_start
    else
      return ' --/--/-- '
  }

  public getRiganave(riga) {
    let ris = riga - 3
    if (ris <= 1)
      ris = 1
    return ris
  }

  public getColnave(col) {
    let ris = Math.floor(col / (2 * 4))
    if (ris <= 1)
      ris = 1
    return ris
  }

  public sonoMediatore() {
    if (!!this.nave) {
      if (!!this.nave.rec.donatore.recmediatore)
        return this.nave.rec.donatore.recmediatore.ind_order === this.nave.ind_order
      else {
        if (!!this.nave.rec.mediatore.recmediatore)
          return this.nave.rec.mediatore.recmediatore.ind_order === this.nave.ind_order
      }
    }

    return false
  }

  public sonoDonatore() {
    if (!!this.nave) {
      for (const rec of this.nave.rec.donatore.arrdonatori) {
        if (!!rec) {
          if (rec.ind_order === this.nave.ind_order)
            return true
        }
      }
    }
    return false
  }

  public getmediatore() {
    return this.nave.rec.donatore.recmediatore
  }

  public change_link_chat() {
    const recmed = this.getmediatore()
    if (recmed.link_chat !== this.link_chat) {
      recmed.link_chat = this.link_chat

      const mydata = {
        link_chat: recmed.link_chat
      }
      tools.saveFieldToServer(this, 'navi', recmed._id, mydata)
    }
  }

  get linkchatopen() {
    return this.link_chat
  }

  public sonoSognatore() {
    return this.nave.rec.donatore.recsognatore.ind_order === this.nave.ind_order
  }

  public getclassSelect(rec) {
    if (rec.ind_order === this.nave.ind_order)
      return ' you'
  }

  public gettitlenave(ind) {
    if (ind === 1)
      return this.getRiganave(this.nave.riga) + '.' + this.getColnave(this.nave.col)
    else
      return (this.getrigaNaveByInd(ind)) + '.x'
  }

  public getdatanave(rec) {
    if (this.sonoDonatore()) {
      if (rec.ind === 1) {
        return tools.getstrshortDate(this.nave.date_start) // Donatore
      }
    }
    if (this.sonoMediatore()) {
      if (rec.ind === 4) {
        return tools.getstrshortDate(this.nave.date_start) // Mediatore
      }
    }

    return this.getNavePartByInd(rec.ind)
  }

  public getrigaNaveByInd(ind) {
    return this.getRiganave(this.nave.riga + ind - 1)
  }

  public NaveeseguitabyInd(riga) {
    return (this.riga >= riga)
  }

  public getclpos(rec) {
    if (this.NaveeseguitabyInd(this.getrigaNaveByInd(rec.ind))) {
      return 'you'
    } else {
      return ''
    }
  }

  public geticon(rec) {

    if (this.rigadoni >= this.getrigaNaveByInd(rec.ind)) {
      return 'fas fa-gift'
    }
  }

  public async InviaMsgANave(msgobj, navemediatore) {

    let msgtitle = translate('dashboard.controlla_donatori')
    if (msgobj.inviareale) {
      msgtitle = translate('dashboard.invia_link_chat')
    }

    await tools.askConfirm(this.$q, msgtitle, translate('dashboard.inviare_msg_donatori') + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_DONATORI, 0, {
      param1: msgobj,
      param2: navemediatore
    })

  }

  public async InviaMsgADonatori(msgobj) {

    const navemediatore = {
      id: this.mediatore._id,
      riga: this.mediatore.riga,
      col: this.mediatore.col
    }

    this.InviaMsgANave(msgobj, navemediatore)
  }

  get linkchatesiste() {
    if (!!this.linkchatopen)
      return this.linkchatopen.length > 10
    return false
  }

  public InviaLinkChatADonatori(inviareale) {

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_LINK_CHAT_DONATORI,
      msgpar1: this.linkchatopen,
      inviareale,
    }

    this.InviaMsgADonatori(msgobj)
  }

}
