import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { QEditor } from 'quasar'
import { CMyEditor } from '../CMyEditor'
import MixinBase from '../../mixins/mixin-base'
import { fieldsTable } from '../../store/Modules/fieldsTable'
import { IColGridTable } from '../../model'
import { CMySelect } from '../CMySelect'
import { GlobalStore, UserStore } from '../../store/Modules'
import { CMyChipList } from '../CMyChipList'
import { CMyToggleList } from '../CMyToggleList'
import translate from '@src/globalroutines/util'
import { CDateTime } from '../CDateTime'

@Component({
  name: 'CMyFieldDb',
  components: { CMyEditor, CMySelect, CMyChipList, CMyToggleList, CDateTime }
})

export default class CMyFieldDb extends MixinBase {
  @Prop({ required: true }) public title
  @Prop({ required: true }) public mykey: string
  @Prop({ required: false, default: '' }) public mysubkey: string
  @Prop({ required: true }) public type: number
  @Prop({ required: false, default: false }) public serv: boolean
  @Prop({ required: false, default: false }) public disable: boolean
  @Prop({ required: false, default: '' }) public jointable: string
  @Prop({ required: false, default: 'settings' }) public table: string
  @Prop({ required: false, default: '' }) public myimg: string
  @Prop({ required: false, default: '' }) public id: string
  @Prop({ required: false, default: '' }) public idmain: string

  public $t
  public myvalue = ''
  public col: IColGridTable = { name: 'test' }
  public canEdit: boolean = true
  public countryname = ''

  public created() {
    this.crea()
  }

  public crea() {

    this.myvalue = this.getValDb(this.mykey, this.serv, '', this.table, this.mysubkey, this.id, this.idmain)
    this.col.jointable = this.jointable
    this.col.fieldtype = this.type
    this.col.label = this.title

    // console.log('CMyFieldDb crea', this.myvalue)
  }

  @Watch('id')
  public idchanged(value) {
    this.crea()
  }

  public getclassCol(col) {
    if (col) {
      let mycl = (this.disable || col.disable) ? '' : 'colmodif '
      mycl += ((col.fieldtype === tools.FieldType.date) || (col.fieldtype === tools.FieldType.onlydate)) ? ' coldate flex flex-container ' : ''

      return mycl
    } else {
      return ''
    }
  }

  public visuValByType(val) {
    if (this.col.fieldtype === tools.FieldType.date) {
      if (val === undefined) {
        return '[]'
      } else {
        return tools.getstrDateTime(val)
      }
    } else if (this.col.fieldtype === tools.FieldType.onlydate) {
      if (val === undefined) {
        return '[]'
      } else {
        return tools.getstrDate(val)
      }
    } else if (this.col.fieldtype === tools.FieldType.boolean) {
      return (val) ? this.$t('dialog.yes') : this.$t('dialog.no')
    } else if (this.col.fieldtype === tools.FieldType.binary) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getArrStrByValueBinary(this, this.col, val)
    } else if (this.col.fieldtype === tools.FieldType.select) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getValueByTable(this.col, val)
    } else if (this.col.fieldtype === tools.FieldType.multiselect) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getMultiValueByTable(this.col, val)
    } else if (this.col.fieldtype === tools.FieldType.multioption) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getMultiValueByTable(this.col, val)
    } else if (this.col.fieldtype === tools.FieldType.password) {
      if (val === undefined)
        return '[---]'
      else
        return '***************'
    } else {
      if (val === undefined)
        return ' <span class="text-grey">(' + translate('reg.select') + ')</span> '
      else if (val === '') {
        return ' <span class="text-grey">(' + translate('reg.select') + ')</span> '
      } else {
        let mystr = tools.firstchars(val, 5000)
        if (val) {
          if (val.length > 5000)
            mystr += '...'
        } else {
          return val
        }
        return mystr
      }
    }
  }

  get mycl() {
    if (this.disable) {
      return 'cldisable'
    }
  }

  get myvalprinted() {
    return this.visuValByType(this.myvalue)
  }

  public savefield(value, initialval) {
    this.myvalue = value
    this.setValDb(this.mykey, this.myvalue, this.type, this.serv, this.table, this.mysubkey, this.id)
  }

  public savefieldboolean(value) {
    if (this.myvalue === undefined)
      this.myvalue = 'true'
    else
      this.myvalue = value

    this.setValDb(this.mykey, this.myvalue, this.type, this.serv, this.table, this.mysubkey, this.id)
  }

  public selectcountry({ name, iso2, dialCode }) {
    // console.log(name, iso2, dialCode)
    this.myvalue = iso2
    this.countryname = name
  }

  public intcode_change(coderec) {
    this.myvalue = '+' + coderec.dialCode
  }

}
