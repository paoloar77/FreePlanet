import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IColGridTable } from '../../model'
import { fieldsTable } from '../../store/Modules/fieldsTable'
import { CMyChipList } from '../CMyChipList'
import { CDate } from '../CDate'
import { CDateTime } from '../CDateTime'
import { CMyToggleList } from '../CMyToggleList'
import { CMySelect } from '../CMySelect'
import { CMyEditor } from '../CMyEditor'
import { CGallery } from '../CGallery'

@Component({
  name: 'CMyPopupEdit',
  components: { CMyChipList, CDateTime, CDate, CMyToggleList, CMySelect, CMyEditor, CGallery }
})

export default class CMyPopupEdit extends Vue {
  @Prop({ required: true }) public row
  @Prop({ required: true }) public col
  @Prop({ required: false, default: false }) public canEdit
  @Prop({ required: false, default: '' }) public field
  @Prop({ required: false, default: '' }) public subfield
  @Prop({ required: false, default: false }) public showall
  @Prop({ required: false, default: 'row' }) public view
  @Prop({ required: false, default: '5' }) public minuteinterval
  @Prop({ required: false, default: false }) public disable
  @Prop({ required: false, default: false }) public visulabel

  public myvalue = ''
  public myvalueprec = 'false'
  public countryname = ''
  public visueditor: boolean = false

  get tools() {
    return tools
  }

  get isviewfield() {
    return this.view === 'field'
  }

  get db_fieldsTable() {
    return fieldsTable
  }

  public changeval(newval) {
    console.log('changeval update:row', newval)
    this.$emit('update:row', newval)
  }

  public changevalRec(newval) {
    console.log('this.row', this.row, 'this.col', this.col, 'newval', newval)
    console.log('this.row[this.col.name]', this.row[this.col.name])
    this.row[this.col.name] = newval
    console.log('changevalRec update:row', newval)
    this.$emit('update:row', this.row)
  }

  public updatedata() {
    this.mounted()
  }

  public mounted() {
    // console.log('mounted')
    if ((this.subfield !== '') && (this.subfield !== '')) {
      if (this.row[this.field] === undefined) {
        this.row[this.field] = {}
        this.myvalue = ''
      } else {
        this.myvalue = this.row[this.field][this.subfield]
      }
    } else {
      if (this.field !== '')
        this.myvalue = this.row[this.field]
      else
        this.myvalue = this.row
    }

    this.myvalueprec = this.myvalue

    // console.log('this.myvalueprec', this.myvalueprec)
  }

  public OpenEdit() {
    // console.log('OpenEdit')
    this.$emit('show')
  }

  public getval() {
    let myval = 'false'

    if ((this.subfield !== '') && (this.subfield !== '')) {
      if (this.row[this.field] === undefined) {
        this.row[this.field] = {}
        myval = ''
      } else {
        myval = this.row[this.field][this.subfield]
      }
    } else {
      if (this.field !== '')
        myval = this.row[this.field]
      else
        myval = this.row
    }

    return myval
  }

  public SaveValueInt(newVal, valinitial) {

    // console.log('SaveValueInt', newVal, valinitial)

    // Update value in table memory
    if (this.subfield !== '') {
      if (this.row[this.field] === undefined)
        this.row[this.field] = {}
      this.row[this.field][this.subfield] = newVal
    } else {
      if (this.field !== '')
        this.row[this.field] = newVal
      else
        this.row = newVal
    }

    this.$emit('save', newVal, valinitial)
  }

  public annulla(val) {
    this.$emit('annulla', true)
  }

  public Savedb(newVal, valinitial) {

    if (this.col.fieldtype === tools.FieldType.boolean) {
      // console.log('this.myvalue', this.myvalue, newVal, this.myvalueprec)
      if (this.myvalueprec === undefined) {
        newVal = true
        this.myvalueprec = this.myvalue
        this.myvalue = newVal
      }
      // console.log('DOPO this.myvalue', this.myvalue, newVal, this.myvalueprec)
    }

    // console.log('Savedb', newVal)

    this.$emit('showandsave', this.row, this.col, newVal, valinitial)
    this.visueditor = false
  }

  public visuValByType(val, col: IColGridTable, row) {
    if (col === undefined || row === undefined)
      return

    // let val = ''
    // if (col.subfield !== '') {
    //   if (row[col.field] === undefined)
    //     row[col.field] = {}
    //
    //   val = row[col.field][col.subfield]
    // } else {
    //   val = row[col.field]
    // }
    //
    if (col.fieldtype === tools.FieldType.date) {
      if (val === undefined) {
        return '[]'
      } else {
        return tools.getstrDateTime(val)
      }
    } else if (col.fieldtype === tools.FieldType.onlydate) {
      if (val === undefined) {
        return '[]'
      } else {
        return tools.getstrDate(val)
      }
    } else if (col.fieldtype === tools.FieldType.boolean) {
      return (val) ? this.$t('dialog.yes') : this.$t('dialog.no')
    } else if (col.fieldtype === tools.FieldType.binary) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getArrStrByValueBinary(this, col, val)
    } else if (col.fieldtype === tools.FieldType.select) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getValueByTable(col, val)
    } else if (col.fieldtype === tools.FieldType.multiselect) {
      if (val === undefined)
        return '[---]'
      else
        return fieldsTable.getMultiValueByTable(col, val)
    } else {
      if (val === undefined)
        return '[]'
      else if (val === '') {
        return '[]'
      } else {
        let mystr = ''
        if (this.showall) {
          return val
        } else {
          mystr = tools.firstchars(val, tools.MAX_CHARACTERS)
        }
        if (val) {
          if (val.length > tools.MAX_CHARACTERS)
            mystr += '...'
        } else {
          return val
        }
        return mystr
      }
    }
  }

  public visInNewRec(col) {
    return !col.notShowInNewRec
  }

  public getclassCol(col) {
    if (col) {
      let mycl = (col.disable || this.isviewfield) ? '' : 'colmodif'
      mycl += ((col.fieldtype === tools.FieldType.date) || (col.fieldtype === tools.FieldType.onlydate)) ? ' coldate flex flex-container' : ''

      return mycl
    } else {
      return ''
    }
  }

  public changeCol() {

  }

  public selectcountry({ name, iso2, dialCode }) {
    // console.log(name, iso2, dialCode)
    this.myvalueprec = this.myvalue
    this.myvalue = iso2
    this.countryname = name
  }

  public intcode_change(coderec) {
    this.myvalueprec = this.myvalue
    this.myvalue = '+' + coderec.dialCode
  }

}
