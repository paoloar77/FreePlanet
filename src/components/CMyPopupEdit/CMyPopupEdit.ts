import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IColGridTable } from '../../model'
import { fieldsTable } from '../../store/Modules/fieldsTable'
import { CMyChipList } from '../CMyChipList'
import { CDateTime } from '../CDateTime'
import { CMyToggleList } from '../CMyToggleList'
import { CMySelect } from '../CMySelect'

@Component({
  name: 'CMyPopupEdit',
  components: {CMyChipList, CDateTime, CMyToggleList, CMySelect}
})

export default class CMyPopupEdit extends Vue {
  @Prop({ required: true }) public row
  @Prop({ required: true }) public col
  @Prop({ required: false, default: false }) public canEdit
  @Prop({ required: false, default: '' }) public field
  @Prop({ required: false, default: '' }) public subfield

  public myvalue = ''

  get tools() {
    return tools
  }

  get db_fieldsTable() {
    return fieldsTable
  }
  public changeval(newval) {
    this.$emit('update:row', newval)
  }

  public mounted() {
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
  }

  public OpenEdit() {
    // console.log('OpenEdit')
    this.$emit('show')
  }

  public SaveValueInt(newVal, valinitial) {

    // console.log('SaveValueInt', newVal)

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
        let mystr = tools.firstchars(val, tools.MAX_CHARACTERS)
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

  public getclassCol(col) {
    if (col) {
      let mycl = (col.disable || !this.canEdit) ? '' : 'colmodif'
      mycl += (col.fieldtype === tools.FieldType.date) ? ' coldate flex flex-container' : ''

      return mycl
    } else {
      return ''
    }
  }

  public changeCol() {

  }
}
