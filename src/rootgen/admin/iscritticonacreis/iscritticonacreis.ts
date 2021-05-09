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

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class SitesPage extends MixinMetaTags {
  public pagination = {
    sortBy: 'name',
    descending: false,
    page: 2,
    rowsPerPage: 5
    // rowsNumber: xx if getting data from a server
  }

  public selected = []
  public dataPages = []

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
      filterand: '',
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

    const myrec = await this.loadrec()

    const sep = ';'

    let mystr = ''

    mystr += 'anno' + sep + 'Num' + sep + 'Conacreis' + sep + 'data_richiesta_iscrizione' + sep + 'data_approvazione_iscrizione' + sep + 'nome' + sep + 'cognome' + sep + 'codice_fiscale' + sep + 'nazione' + sep + 'indirizzo' + sep + 'localita' + sep + 'Prov' + sep + 'cap' + sep + 'data_nascita' + sep + 'nazione_nascita' + sep + 'luogo_nascita' + sep + 'provincia_nascita' + sep + 'email' + sep + 'telefono' + sep + 'quota_versata' + '\n';
    let index = 1
    for (const rec of myrec) {
      mystr += rec.annoTesseramento + sep
      mystr += index + sep
      mystr += rec.codiceConacreis + sep
      mystr += tools.getstrDate(rec.dateofreg) + sep
      mystr += tools.getstrDate(rec.dateofapproved) + sep
      mystr += rec.name + sep
      mystr += rec.surname + sep
      mystr += rec.fiscalcode + sep
      mystr += tools.getNationsByNationality(rec.residency_country) + sep
      mystr += rec.residency_address + sep
      mystr += rec.residency_city + sep
      mystr += rec.residency_province + sep
      mystr += rec.residency_zipcode + sep
      mystr += tools.getstrDate(rec.dateofbirth) + sep
      mystr += tools.getNationsByNationality(rec.born_country) + sep
      mystr += rec.born_city + sep
      mystr += rec.born_province + sep
      mystr += rec.email + sep
      mystr += rec.cell_phone + sep
      // mystr += 'si' + sep
      // mystr += 'si' + sep
      mystr += '\n'
      index++
    }

    tools.copyStringToClipboard(this, mystr, false)
  }

}
