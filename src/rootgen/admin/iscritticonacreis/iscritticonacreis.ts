import { Component, Prop } from 'vue-property-decorator'

import { tools } from '../../../store/Modules/tools'
import { static_data } from '../../../db/static_data'

import { colTableIscrittiConacreis } from '@src/store/Modules/fieldsTable'

import { CImgText } from '../../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../../mixins/mixin-metatags'
import MixinBase from '@src/mixins/mixin-base'
import { IParamsQuery, ISignupIscrizioneConacreisOptions } from '@src/model'
import { GlobalStore, UserStore } from '@store'
import { ISignupConacreis } from '@src/components/CSignUpIscrizioneConacreis/CSignUpIscrizioneConacreis-validate'
import { shared_consts } from '@src/common/shared_vuejs'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class IscrittiConacreis extends MixinMetaTags {
  public arrfilterand = []
  public myrec: ISignupIscrizioneConacreisOptions[]
  public pagination = {
    sortBy: 'name',
    descending: false,
    page: 2,
    rowsPerPage: 5
    // rowsNumber: xx if getting data from a server
  }

  public selected = []
  public dataPages = []

  public myfilter = ''

  public mounted() {
    this.arrfilterand = [
      {
        label: 'Manca il pagamento',
        value: shared_consts.FILTER_MISSING_PAYMENT
      },
      {
        label: 'Da Tesserare',
        value: shared_consts.FILTER_TO_MAKE_MEMBERSHIP_CARD
      },
      {
        label: 'Tesserati',
        value: shared_consts.FILTER_MEMBERSHIP_CARD_OK
      },
    ]

  }

  get getcolIscrittiConacreis() {
    return colTableIscrittiConacreis
  }

  public meta() {
    return tools.metafunc(this)
  }

  get static_data() {
    return static_data
  }

  public loadrec(): ISignupIscrizioneConacreisOptions[] {
    const sortBy = 'numshared'
    const descending = 1
    const myobj = {}
    if (descending)
      myobj[sortBy] = -1
    else
      myobj[sortBy] = 1

    const params: IParamsQuery = {
      table: 'iscritticonacreis',
      startRow: 0,
      endRow: 10000,
      filter: '',
      filterand: this.myfilter,
      sortBy: myobj,
      descending,
      userId: UserStore.state.my._id
    }

    console.log('myload', params)

    return GlobalStore.actions.loadTable(params).then((data) => {
      return data.rows
    })
  }

  public async exportLista() {

    this.myrec = await this.loadrec()

    const sep = ';'

    let mystr = ''

    mystr += 'anno' + sep + 'numero_tessera' + sep + 'Conacreis' + sep + 'data_richiesta_iscrizione' + sep + 'data_approvazione_iscrizione' + sep
      + 'nome' + sep + 'cognome' + sep + 'codice_fiscale' + sep + 'partita_iva' + sep + 'nazione' + sep + 'indirizzo' + sep
      + 'localita' + sep + 'Prov' + sep + 'cap' + sep + 'nazione_nascita' + sep + 'data_nascita' + sep
      + 'luogo_nascita' + sep + 'provincia_nascita' + sep + 'email' + sep + 'telefono' + sep + 'quota_versata' + '\n'
    let index = 1
    for (const rec of this.myrec) {
      mystr += rec.annoTesseramento + sep
      mystr += (!!rec.numTesseraInterna ? rec.numTesseraInterna : ' ') + sep
      mystr += (!!rec.codiceConacreis ? rec.codiceConacreis + sep : ' ') + sep
      mystr += tools.getstrDate(rec.dateofreg) + sep
      mystr += tools.getstrDate(rec.dateofapproved) + sep
      mystr += rec.name + sep
      mystr += rec.surname + sep
      mystr += rec.fiscalcode + sep
      mystr += ' ' + sep // partita_iva
      mystr += rec.residency_country + sep
      mystr += rec.residency_address + sep
      mystr += rec.residency_city + sep
      mystr += rec.residency_province + sep
      mystr += rec.residency_zipcode + sep
      mystr += rec.born_country + sep
      mystr += tools.getstrDate(rec.dateofbirth) + sep
      mystr += rec.born_city + sep
      mystr += rec.born_province + sep
      mystr += rec.email + sep
      mystr += rec.cell_phone + sep
      mystr += (rec.ha_pagato ? 'si' : 'no') + sep
      // mystr += 'si' + sep
      // mystr += 'si' + sep
      mystr += '\n'
      index++
    }

    tools.copyStringToClipboard(this, mystr, false)
  }

  public savefilter(filter) {
    console.log('filter', filter)
    this.myfilter = filter
  }
}
