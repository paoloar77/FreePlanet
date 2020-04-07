import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'
import MixinNave from '../../mixins/mixin-nave'
import { CTitleBanner } from '../CTitleBanner'
import { GlobalStore, UserStore } from '../../store/Modules'
import { lists } from '../../store/Modules/lists'
import translate from '../../globalroutines/util'
import { CMyChipList } from '../CMyChipList'
import { CVideo } from '../CVideo'

@Component({
  components: { CTitleBanner, CMyChipList, CVideo }
})

export default class CMyNave extends MixinNave {
  @Prop({ required: false, default: null }) public naveprop
  @Prop({ required: false, default: null }) public posizprop
  @Prop({ required: true }) public navi_partenzaprop: any[]
  @Prop({ required: true }) public listanavi: boolean
  public navi_partenza: any[]
  public $t
  public link_chat: string = ''
  public cosa: string = 'tragitto'
  public cosa2: string = 'donatore'
  public nave: any = null
  public posiz: any = null
  public numpercorso = 7
  public riga: number = 1
  public col: number = 1
  public rigadoni: number = 1
  public coldoni: number = 1
  public mediatore: any = null
  public donatore: any = {}
  public donatore_navepers: any = {}
  public mediatore_navepers: any = {}
  public iodonatore: any = {}
  public iosognatore: any = {}
  public donoinviato: boolean = false
  public arrdonatori: any[] = []
  public recsel = null
  public loading: boolean = false
  public showmsguser: boolean = false
  public seluser = null
  public msg_tosend_user: string = ''
  public MyPagination: {
    sortBy: string,
    descending: boolean,
    page: number,
    rowsNumber: number, // specifying this determines pagination is server-side
    rowsPerPage: number
  } = { sortBy: 'index', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }
  public coldonatori: any[] = [
    /*{
      name: 'index',
      required: true,
      label: 'Num',
      align: 'left',
      field: 'index',
      sortable: true
    },*/
    { name: 'name', align: 'center', label: translate('reg.name'), field: 'name', sortable: true },
    { name: 'surname', align: 'center', label: translate('reg.surname'), field: 'surname', sortable: true },
    { name: 'posizione', align: 'center', label: 'Posizione', field: 'riga', sortable: true },
    { name: 'date_made_gift', align: 'center', label: 'Inviato', field: 'date_made_gift', sortable: true },
    { name: 'tel', align: 'center', label: 'Tel', field: 'tel', sortable: true },
    { name: 'made_gift', align: 'center', label: 'Confermato', field: 'made_gift', sortable: true },
  ]

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
    this.posiz = this.posizprop
    this.navi_partenza = this.navi_partenzaprop
    this.nave = this.naveprop
    if (!this.listanavi) {
      this.apri()
    }
    this.aggiorna()
  }

  public aggiorna() {

    this.riga = tools.getValDb('riga', false, 1)
    this.col = tools.getValDb('col', false, 1)
    this.rigadoni = tools.getValDb('rigadoni', false, 1)
    this.coldoni = tools.getValDb('coldoni', false, 1)

    if (!!this.nave) {
      if (!!this.nave.rec) {
        if (!!this.nave.rec.donatore)
          this.donatore_navepers = this.nave.rec.donatore.navepersistente
        if (!!this.nave.rec.mediatore) {
          this.mediatore = this.getmediatore()
          this.donatore = this.getdonatore()
          if (!!this.nave.rec.mediatore)
            this.mediatore_navepers = this.nave.rec.mediatore.navepersistente

          this.iodonatore = this.getIoDonatore()
          this.iosognatore = this.getIoSognatore()
          this.donoinviato = this.getDonoInviato

          // console.log('this.mediatore', this.mediatore)
          // console.log('this.donatore', this.donatore)

          if (!!this.mediatore_navepers) {
            this.link_chat = this.mediatore_navepers.link_chat
          }

          this.arrdonatori = this.creaarrDonatori()
        }
      }
    }
  }

  public getListaDonatoriDaConfermare() {
    let mystr = ''

    if (!!this.nave.listadonatoridelsognatore) {
      if (this.nave.listadonatoridelsognatore.length > 0) {
        for (const rec of this.nave.listadonatoridelsognatore) {
          mystr += rec.name + ' ' + rec.surname + ' [' + rec.riga + '.' + rec.col + ']<br>'
        }
      }
    }
    return mystr
  }

  public creaarrDonatori() {
    const arr = []
    if (!!this.nave.listadonatoridelsognatore) {
      if (this.nave.listadonatoridelsognatore.length > 0) {
        let index = 0
        for (const rec of this.nave.listadonatoridelsognatore) {

          index++
          arr.push({ index, ...rec })
        }
      }
    }

    return arr
  }

  public getRiganave() {
    if (this.listanavi) {
      return this.nave.riga
    } else {
      if (!!this.posiz) {
        let ris = this.posiz.riga - 3
        if (ris <= 1)
          ris = 1

        return ris
      }

      return 1
    }
  }

  public getColnave() {
    if (this.listanavi) {
      return this.nave.col
    } else {
      if (!this.posiz) {
        return 1
      } else {
        let ris = Math.ceil(this.posiz.col / (2 * 4))
        if (ris <= 1)
          ris = 1
        return ris
      }
    }
  }

  public getColnaveriduci(col) {
    let ris = Math.ceil(col / (2 * 4))
    if (ris <= 1)
      ris = 1
    return ris
  }

  public sonoMediatore() {
    if (!!this.nave) {
      if (!!this.nave.rec.donatore)
        return this.nave.rec.donatore.recmediatore.ind_order === this.myindorder
      else {
        if (!!this.nave.rec.mediatore)
          return this.nave.rec.mediatore.recmediatore.ind_order === this.myindorder
      }
    }

    return false
  }

  public partenza_primo_donatore() {
    if (!!this.nave) {
      if (!!this.mediatore_navepers) {
        return this.mediatore_navepers.date_start
      }
    }
    return ''
  }

  public getGiornoDelDono() {
    if (!!this.nave) {
      return tools.getstrDate(this.donatore_navepers.date_start)
    }
  }

  get GiornoDelDonoArrivato() {
    if (!!this.nave) {
      return tools.isDateArrived(this.donatore_navepers.date_start)
    }
    return false
  }

  get FattoDono() {
    if (!!this.iodonatore) {
      return this.iodonatore.made_gift
    }
    return false
  }

  public getIoDonatore() {
    if (!!this.nave) {
      if (!!this.nave.rec.donatore) {
        if (this.nave.rec.donatore.arrdonatori) {
          for (const rec of this.nave.rec.donatore.arrdonatori) {
            if (!!rec) {
              if (rec.ind_order === this.myindorder)
                return rec
            }
          }
        }
      }
    }
    return null
  }

  get myindorder() {
    if (this.listanavi)
      return this.nave.ind_order
    else
      return this.posiz.ind_order
  }

  public getIoSognatore() {
    const sognatore = this.sognatoredelDono()
    if (!!sognatore) {
      return sognatore.ind_order === this.myindorder
    }
    return null
  }

  public sognatoredelDono() {
    if (!!this.nave) {
      if (!!this.nave.rec.donatore.recsognatori)
        return this.nave.rec.donatore.recsognatori[0]
    }
    return null
  }

  public HoRicevutoIlDono(rec) {
    this.recsel = rec
    const msgtitle = this.$t('dashboard.dono_ricevuto_2')
    const msginvia = this.$t('dashboard.confermi_dono_ricevuto', {
      donatore: rec.name + ' ' + rec.surname
    })

    const mymsg = this.$t('dashboard.confermi_dono_ricevuto_msg', {
      donatore: rec.name + ' ' + rec.surname + ' (' + this.$t('dashboard.posizione') + ' ' + rec.riga + '.' + rec.col + ')'
    })

    tools.askConfirm(this.$q, msgtitle, msginvia + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DONO_RICEVUTO, 0, {
      param1: {
        _id: rec._id,
        made_gift: true
      },
      param2: rec.username,
      param3: mymsg
    })

  }

  public HoEffettuatoIlDono() {
    const msgtitle = translate('dashboard.confermi_dono')
    const msginvia = msgtitle

    const mymsg = this.$t('dashboard.msg_bot_conferma', {
      donatore: this.iodonatore.name + ' ' + this.iodonatore.surname,
      sognatore: this.sognatoredelDono().name + ' ' + this.sognatoredelDono().surname
    })

    tools.askConfirm(this.$q, msgtitle, msginvia + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DONO_INVIATO, 0, {
      param1: {
        _id: this.iodonatore._id,
        date_made_gift: tools.getDateNow()
      },
      param2: this.sognatoredelDono().username,
      param3: mymsg
    })

  }

  public ActionAfterYes(action, item, data) {
    console.log('ActionAfterYes...')
    if (action === lists.MenuAction.DONO_INVIATO) {

      if (!!this.iodonatore) {
        this.iodonatore.date_made_gift = tools.getDateNow()

        this.donoinviato = true

        console.log('date_made_gift', this.iodonatore.date_made_gift)
      }
      // this.refresh()
    } else if (action === lists.MenuAction.DONO_RICEVUTO) {
      if (!!this.recsel) {
        this.recsel.made_gift = true
      }
    }
  }

  public getMetodoPagamentoSognatore() {
    const rec = this.sognatoredelDono()
    if (!!rec) {
      try {
        return rec.profile.paymenttypes
      } catch (e) {
        return ''
      }
    }
  }

  public getemailPagamentoSognatore() {
    const rec = this.sognatoredelDono()
    if (!!rec) {
      if (!!rec.profile)
        return rec.profile.email_paypal
    }
    return ''
  }

  get getDonoInviato() {
    if (!!this.iodonatore) {
      return !!this.iodonatore.date_made_gift
    }

    return false
  }

  public sonoDonatore() {
    return !!this.iodonatore
  }

  public sonoSecondaTessituraDonatore() {
    const mediatore = this.getmediatore()
    for (const rec of this.nave.rec.donatore.arrdonatori) {
      if (!!rec) {
        if (mediatore) {
          if ((mediatore.ind_order === rec.ind_order) && (rec.num_tess % 2) === 0)
            return true
        }
      }
    }

    return false
  }

  public sonoSognatore() {
    return !!this.iosognatore
  }

  public getmediatore() {
    if (!!this.nave.rec.mediatore)
      return this.nave.rec.mediatore.recmediatore
    return null
  }

  public getdonatore() {
    if (!!this.nave.rec.donatore)
      return this.nave.rec.donatore.recmediatore
    return null
  }

  public change_link_chat() {
    const recmedpers = this.mediatore_navepers
    if (!!recmedpers) {
      if (recmedpers.link_chat !== this.link_chat) {
        recmedpers.link_chat = this.link_chat

        const mydata = {
          link_chat: recmedpers.link_chat
        }
        tools.saveFieldToServer(this, 'navepersistente', recmedpers._id, mydata)
      }
    }
  }

  get linkchatopen() {
    return this.donatore_navepers.link_chat
  }

  public getclassSelect(rec) {
    if (rec.ind_order === this.myindorder)
      return ' you'
  }

  public gettitlenave(ind) {
    let ris = ''
    if (ind === 1)
      return this.getRiganave() + '.' + this.getColnave()
    else {
      ris = (this.getrigaNaveByInd(ind)) + '.' + this.getcolNaveByInd(ind)
    }
    let add = ''
    // for (let index = 0; index < (4 - ris.length); index++) {
    //   add += '&nbsp;'
    // }

    ris = add + ris
    return ris
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

    const riga = this.getrigaNaveByInd(rec.ind)
    const col = this.getcolNaveByInd(rec.ind)
    const mynavepart = this.getnavePartenzaByRigaCol(riga, col)
    if (!!mynavepart) {
      if (!!mynavepart.date_start)
        return tools.getstrshortDate(mynavepart.date_start)
    }
    return ' --/-- '
    // return this.getNavePartByInd(rec.ind)
  }

  public getTutor(rec) {
    const mynavepart = this.getnavePartenzaByRigaCol(rec.riga, rec.col)
    if (!!mynavepart)
      return mynavepart.tutor_namesurname
    return ''
  }

  public getTutor_username(rec) {
    const mynavepart = this.getnavePartenzaByRigaCol(rec.riga, rec.col)
    if (!!mynavepart)
      return mynavepart.tutor
    return ''
  }

  public getnavePartenzaByRigaCol(riga, col) {
    for (const mynave of this.navi_partenza) {
      if (!!mynave) {
        if ((mynave.riga === riga) && (mynave.col === col)) {
          return mynave
        }
      }
    }
    return null
  }

  public getrigaNaveByInd(ind) {
    if (this.listanavi) {
      return this.nave.riga + ind - 1
    } else {
      let ris = this.posiz.riga + ind - 1 - 3
      if (ris <= 1)
        ris = 1
      return ris
    }
  }

  public getcolNaveByInd(ind) {
    if (this.listanavi) {
      return this.nave.col * Math.pow(2, ind - 1)
    } else {
      let ris = Math.ceil(this.posiz.col * Math.pow(2, ind - 1) / (2 * 4))
      if (ris <= 1)
        ris = 1
      return ris
    }
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
    if (!rec)
      return ''

    // console.log('this.rigadoni', this.rigadoni, 'ind', rec.ind)
    if (!rec.ind)
      return ''

    const riga = this.getrigaNaveByInd(rec.ind)
    const col = this.getcolNaveByInd(rec.ind)
    const mynavepart = this.getnavePartenzaByRigaCol(riga, col)
    if (!!mynavepart) {
      if (mynavepart.DoniConfermati > 0) {
        return 'fas fa-gift'
      }
    }
    if (this.rigadoni >= this.getrigaNaveByInd(rec.ind)) {
      // return 'fas fa-gift'
    }
  }

  public async InviaMsgANave(msgobj, navemediatore) {

    let msgtitle = translate('dashboard.controlla_donatori')
    let msginvia = msgtitle
    if (msgobj.inviareale) {
      msgtitle = translate('dashboard.invia_link_chat')
      msginvia = translate('dashboard.inviare_msg_donatori')
    }

    tools.askConfirm(this.$q, msgtitle, msginvia + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_DONATORI, 0, {
      param1: msgobj,
      param2: navemediatore,
      param3: tools.TipoMsg.SEND_LINK_CHAT_DONATORI
    })

  }

  public InviaMsgADonatori(msgobj) {

    const navemediatore = {
      id: this.mediatore._id,
      riga: this.mediatore.riga,
      col: this.mediatore.col
    }

    this.InviaMsgANave(msgobj, navemediatore)
  }

  get linkchatesiste() {
    if (!!this.link_chat)
      return this.link_chat.length > 10
    return false
  }

  public InviaLinkChatADonatori(inviareale) {

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_LINK_CHAT_DONATORI,
      msgpar1: this.link_chat,
      inviareale,
      username_mitt: ''
    }

    if (!!this.nave.username)
      msgobj.username_mitt = this.nave.username
    else
      msgobj.username_mitt = UserStore.state.my.username

    this.InviaMsgADonatori(msgobj)
  }

  public getdatastr(mydata) {
    return tools.getstrshortDate(mydata)
  }

  public gettitlemediatore() {
    return this.getdatastr(this.partenza_primo_donatore()) + ' ' + this.$t('dashboard.nave') + ' ' + this.getisProvvisoriaMediatoreStr() + this.mediatore.riga + '.' + this.mediatore.col + ' ' + '🎁' + 'AYNI'
  }

  public gettitledonatore() {
    return this.getdatastr(this.donatore_navepers.date_start) + ' ' + this.$t('dashboard.nave') + ' ' + this.getisProvvisoriaStr() + this.donatore_navepers.riga + '.' + this.donatore_navepers.col + ' ' + '🎁' + 'AYNI'
  }

  public gettesto() {
    return this.$t('dashboard.sonomediatore', { nomenave: this.gettitlemediatore() })
  }

  public getisProvvisoriaStr() {
    let istemp = false

    if (!!this.donatore_navepers) {
      if (this.donatore_navepers.provvisoria) {
        istemp = true
      }
    } else {
      istemp = true
    }
    if (istemp) {
      return ' ' + this.$t('dashboard.temporanea') + ' '
    }
    return ''
  }

  public getisProvvisoriaMediatoreStr() {
    let istemp = false

    if (!!this.mediatore_navepers) {
      if (this.mediatore_navepers.provvisoria) {
        istemp = true
      }
    } else {
      istemp = true
    }
    if (istemp) {
      return ' ' + this.$t('dashboard.temporanea') + ' '
    }
    return ''
  }

  public isDefinitivaMediatore() {
    if (!!this.mediatore_navepers)
      return (!this.mediatore_navepers.provvisoria)
    return false
  }

  public getindex(recdonatore, index) {
    if (recdonatore.ind_order === this.nave.rec.donatore.recmediatore.ind_order && (recdonatore.num_tess % 2) === 0)
      return this.$t('dashboard.ritessitura')

    return 'D' + (index)
  }

  public getposizione() {
    let pos = ''
    if (!this.listanavi) {
      pos = this.$t('dashboard.posizione') + ' ' + this.getisProvvisoriaStr() + this.posiz.riga + '.' + this.posiz.col
    }
    return pos
  }

  public getDoniAttesaDiConferma() {
    return this.arrdonatori.filter((rec) => (!!rec.date_made_gift && !rec.made_gift)).reduce((sum, item) => sum + 1, 0)
  }

  public getDoniConfermati() {
    return this.arrdonatori.filter((rec) => rec.made_gift).reduce((sum, item) => sum + 1, 0)
  }

  public getDoniMancanti() {
    return this.arrdonatori.filter((rec) => (!rec.made_gift && !rec.date_made_gift)).reduce((sum, item) => sum + 1, 0)
  }

  public async apri() {
    let riga = 0
    let col = 0
    let riga1don = 1
    let col1don = 1
    let ind_order = -1;
    if (this.listanavi) {
      riga = this.nave.riga
      col = this.nave.col
      riga1don = riga + 3
      col1don = col * Math.pow(2, 3)
      if (!!this.sognatoredelDono())
        ind_order = this.sognatoredelDono().ind_order
    } else {
      riga1don = this.posiz.riga
      col1don = this.posiz.col
      ind_order = this.posiz.ind_order
      riga = this.posiz.riga - 3
      col = this.getColnaveriduci(this.posiz.col)
      if (riga < 1)
        riga = 1
      if (col < 1)
        col = 1
    }

    this.loading = true
    const ris = await GlobalStore.actions.GetNave({ riga, col, riga1don, col1don, ind_order })
    this.navi_partenza = ris.navi_partenza
    this.nave = ris.nave
    // console.log('apri', ris)

    this.aggiorna()
    this.loading = false
  }

  public getstrinpartenza() {
    if (this.GiornoDelDonoArrivato) {
      return this.$t('dashboard.nave_partita')
    }
    return this.$t('dashboard.nave_in_partenza')
  }

  public getpartenza() {
    let myrec = null
    if (this.listanavi)
      myrec = this.nave.rec
    else {
      if (!!this.posiz)
        myrec = this.posiz.rec
    }

    if (!!myrec)
      return tools.getstrDate(myrec.donatore.navepersistente.date_start)

    return ''
  }

  public titolonave() {

    if (this.listanavi && !this.nave) {
      return ''
    }

    let str = this.$t('pages.nave') + ` ` + this.getisProvvisoriaStr() + this.getRiganave() + `.` + this.getColnave() + ` ` + this.getstrinpartenza() + ` ` + this.getpartenza()
    if (!!this.nave) {
      if (this.GiornoDelDonoArrivato && !!this.nave.DoniConfermati) {
        str += ' (' + this.$t('dashboard.doni_ricevuti') + ' = ' + this.nave.DoniConfermati + ')'
      }
      if (this.GiornoDelDonoArrivato && this.nave.DoniMancanti > 0) {
        str += ' (' + this.$t('dashboard.doni_mancanti') + ' = ' + this.nave.DoniMancanti + ')'
      }
    }

    return str
  }

  public getcolortitle() {
    if (this.listanavi && !this.nave) {
      return 'bg-primary'
    }
    if (this.listanavi) {
      if (!!this.nave.DoniConfermati && this.nave.DoniMancanti > 0)
        return 'bg-negative'
      if (!!this.nave.DoniConfermati && this.nave.DoniConfermati > 0)
        return 'bg-positive'
    }

    return 'bg-primary'
  }

  public clickseluser(rec) {
    this.seluser = rec
    this.showmsguser = true
  }

  public async InviaMsgAUserConfirm(msgobj, navemediatore) {

    const msgtitle = translate('dialog.sendmsg')

    tools.askConfirm(this.$q, msgtitle, msgobj.msgpar1 + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_SINGOLO, 0, {
      param1: msgobj,
      param2: navemediatore,
    })

  }

  public Chiudi() {
    this.showmsguser = false
  }

  public InviaMsgAUser() {

    if (!this.msg_tosend_user)
      return

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_MSG_SINGOLO,
      msgpar1: this.msg_tosend_user,
      username: this.seluser.username,
      inviareale: true,
      username_mitt: '',
    }

    if (!!this.nave.username)
      msgobj.username_mitt = this.nave.username
    else
      msgobj.username_mitt = UserStore.state.my.username

    const naveuser = this.seluser

    this.InviaMsgAUserConfirm(msgobj, naveuser)
  }

}
