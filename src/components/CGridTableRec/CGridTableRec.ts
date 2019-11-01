import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '../../store/Modules/index'
import { tools } from '../../store/Modules/tools'

import { shared_consts } from '../../common/shared_vuejs'
import { ICategory, IColGridTable, ITableRec } from '../../model'
import { CTodo } from '../todos/CTodo'
import { SingleProject } from '../projects/SingleProject'
import { lists } from '../../store/Modules/lists'
import { IParamsQuery } from '../../model/GlobalStore'
import { fieldsTable } from '../../store/Modules/fieldsTable'
import { CDateTime } from '../CDateTime'
import { CMyToggleList } from '../CMyToggleList'
import { CMyChipList } from '../CMyChipList'

@Component({
  components: { CDateTime, CMyToggleList, CMyChipList }
})
export default class CGridTableRec extends Vue {
  @Prop({ required: false }) public prop_mytable: string
  @Prop({ required: true }) public prop_mytitle: string
  @Prop({ required: false, default: null }) public prop_mycolumns: any[]
  @Prop({ required: false, default: '' }) public prop_colkey: string
  @Prop({ required: false, default: '' }) public nodataLabel: string
  @Prop({ required: false, default: '' }) public noresultLabel: string
  @Prop({ required: false, default: null }) public tablesList: ITableRec[]

  public mytable: string
  public mytitle: string
  public mycolumns: any[]
  public colkey: string
  public search: string = ''

  public tablesel: string = ''

  public $q
  public $t
  public loading: boolean = false
  public pagination: {
    sortBy: string,
    descending: boolean
    rowsNumber: number
    page: number,
    rowsPerPage: number // specifying this determines pagination is server-side
  } = { sortBy: '', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }

  public serverData: any [] = []
  public spinner_visible: boolean = false

  public idsel: string = ''
  public colsel: IColGridTable = { name: '' }
  public valPrec: string = ''

  public separator: 'horizontal'
  public filter: string = ''
  public rowsel: any
  public dark: boolean = true
  public canEdit: boolean = false

  public returnedData
  public returnedCount
  public colVisib: any[] = []
  public colExtra: any[] = []

  get lists() {
    return lists
  }

  get tableClass() {
    if (this.dark) {
      return 'bg-black'
    }
  }

  public selItem(item, col: IColGridTable) {
    console.log('selItem', item)
    this.rowsel = item
    this.idsel = item._id
    this.colsel = col
  }

  public undoVal() {
    console.log('undoVal', 'colsel', this.colsel, 'valprec', this.valPrec, 'this.colkey', this.colkey, 'this.selected', this.rowsel)
    console.table(this.serverData)
    if (this.colsel)
      this.rowsel[this.colsel.field] = this.valPrec
    // this.serverData[this.colsel] = this.valPrec

  }

  public SaveValue(newVal, valinitial) {
    console.log('SaveValue', newVal, 'rowsel', this.rowsel)

    const mydata = {
      id: this.idsel,
      table: this.mytable,
      fieldsvalue: {}
    }

    mydata.fieldsvalue[this.colsel.field] = newVal

    this.valPrec = valinitial

    this.saveFieldValue(mydata)
  }

  public created() {
    // this.serverData = this.mylist.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]

    this.mytable = this.prop_mytable
    this.mytitle = this.prop_mytitle
    this.mycolumns = this.prop_mycolumns
    this.colkey = this.prop_colkey

    this.changeTable(false)
  }

  public updatedcol() {
    console.log('updatedcol')
    if (this.mycolumns) {
      this.colVisib = []
      this.colExtra = []
      this.mycolumns.forEach((elem) => {
        if (elem.field !== tools.NOFIELD)
          this.colVisib.push(elem.field)

        if (elem.visible && elem.field === tools.NOFIELD)
          this.colExtra.push(elem.name)

      })
    }
  }

  get getrows() {
    return this.pagination.rowsNumber
  }

  public onRequest(props) {
    console.log('onRequest')
    const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
    const filter = this.filter

    if (!this.mytable)
      return

    this.loading = true

    this.spinner_visible = true

    // update rowsCount with appropriate value

    // get all rows if "All" (0) is rowsel
    const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage
    const endRow = startRow + fetchCount

    // fetch data from "server"
    this.fetchFromServer(startRow, endRow, filter, sortBy, descending).then((ris) => {

      this.pagination.rowsNumber = this.getRowsNumberCount(filter)

      // clear out existing data and add new
      if (this.returnedData === []) {
        this.serverData = []
      } else {
        if (this.serverData.length > 0)
          this.serverData.splice(0, this.serverData.length, ...this.returnedData)
        else
          this.serverData = [...this.returnedData]
      }

      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // ...and turn of loading indicator
      this.loading = false
      this.spinner_visible = false
    })
  }

  // emulate ajax call
  // SELECT * FROM ... WHERE...LIMIT...
  public async fetchFromServer(startRow, endRow, filter, sortBy, descending) {

    let myobj = null
    if (sortBy) {
      myobj = {}
      if (descending)
        myobj[sortBy] = -1
      else
        myobj[sortBy] = 1
    }

    const params: IParamsQuery = {
      table: this.mytable,
      startRow,
      endRow,
      filter,
      sortBy: myobj,
      descending
    }

    const data = await GlobalStore.actions.loadTable(params)

    if (data) {
      this.returnedData = data.rows
      this.returnedCount = data.count
    } else {
      this.returnedData = []
      this.returnedCount = 0
    }

    return true

    // if (!filter) {
    //   data = this.original.slice(startRow, startRow + count)
    // }
    // else {
    //   let found = 0
    //   for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
    //     let row = this.original[index]
    //     // match filter?
    //     if (!row['name'].includes(filter)) {
    //       // get a different row, until one is found
    //       continue
    //     }
    //     ++found
    //     if (found >= startRow) {
    //       data.push(row)
    //       ++items
    //     }
    //   }
    // }

    // handle sortBy
    // if (sortBy) {
    //   data.sort((a, b) => {
    //     let x = descending ? b : a
    //     let y = descending ? a : b
    //     if (sortBy === 'desc') {
    //       // string sort
    //       return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
    //     }
    //     else {
    //       // numeric sort
    //       return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
    //     }
    //   })
    // }
  }

  // emulate 'SELECT count(*) FROM ...WHERE...'
  public getRowsNumberCount(filter) {

    // if (!filter) {
    //   return this.original.length
    // }
    // let count = 0
    // this.original.forEach((treat) => {
    //   if (treat['name'].includes(filter)) {
    //     ++count
    //   }
    // })
    // return count

    return this.returnedCount
  }

  public getclassCol(col) {
    let mycl = (col.disable || !this.canEdit) ? '' : 'colmodif'
    mycl += (col.fieldtype === tools.FieldType.date) ? ' coldate flex flex-container' : ''

    return mycl
  }

  public async createNewRecord() {
    this.loading = true

    const mydata = {
      table: this.mytable,
      data: {}
    }

    // const mykey = fieldsTable.getKeyByTable(this.mytable)

    // mydata.data[mykey] = ''

    const data = await GlobalStore.actions.saveTable(mydata)

    this.serverData.push(data)
    this.pagination.rowsNumber++

    this.loading = false
  }

  public saveFieldValue(mydata) {
    console.log('saveFieldValue', mydata)

    // Save on Server
    GlobalStore.actions.saveFieldValue(mydata).then((esito) => {
      if (esito) {
        tools.showPositiveNotif(this.$q, this.$t('db.recupdated'))
      } else {
        tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))
        this.undoVal()
      }
    })
  }

  public mounted() {

    this.canEdit = tools.getCookie(tools.CAN_EDIT, this.canEdit) === 'true'

    this.tablesel = tools.getCookie('tablesel', this.tablesel)
    if (this.tablesel === '') {
      if (!!this.tablesList)
        this.tablesel = this.tablesList[0].value
      else
        this.tablesel = this.mytable
    }

    this.changeTable(false)

  }

  public refresh() {
    // console.log('this.search', this.search)
    if (!!this.search && this.search !== '')
      this.filter = this.search
    else
      this.filter = ''

    // console.log('this.filter', this.filter)

    this.onRequest({
      pagination: this.pagination
    })
  }

  public clickFunz(item, col: IColGridTable) {
    if (col.action) {
      tools.ActionRecTable(this, col.action, this.mytable, item._id, item, col.askaction)
    }
  }

  public ActionAfterYes(action, item, data) {
    if (action === lists.MenuAction.DELETE_RECTABLE) {
      if (this.serverData.length > 0)
        this.serverData.splice(this.serverData.indexOf(item), 1)
    } else if (action === lists.MenuAction.DUPLICATE_RECTABLE) {
      // Add record duplicated
      // this.serverData.push(data)
      this.refresh()
    }
  }

  public visCol(col) {
    if (col.visuonlyEditVal) {
      if (this.canEdit) {
        return col.visuonlyEditVal
      } else {
        return false
      }
    } else {
      return true
    }
  }

  public visuValByType(col: IColGridTable, val) {
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

  public changeCol(newval) {
    tools.setCookie(this.mytable, this.colVisib.join('|'))
  }

  public changeTable(mysel) {
    if (this.tablesel === undefined || this.tablesel === '')
      return

    console.log('changeTable mysel=', mysel, 'tablesel', this.tablesel)

    let mytab = null
    if (this.tablesList) {
      mytab = this.tablesList.find((rec) => rec.value === this.tablesel)
    }

    console.log('this.tablesel', this.tablesel, 'mytab', mytab)

    if (mytab) {
      this.mytitle = mytab.label
      this.colkey = mytab.colkey
      this.mycolumns = [...mytab.columns]
    }

    console.log('this.mycolumns')
    console.log(this.mycolumns)
    console.log('this.tablesList:')
    console.table(this.tablesList)

    if (!!this.mycolumns) {
      this.mycolumns.forEach((rec: IColGridTable) => {
        if (rec.label_trans)
          rec.label = this.$t(rec.label_trans)
      })
    }

    if (mytab) {
      this.mytable = mytab.value
    }

    tools.setCookie('tablesel', this.tablesel)

    this.updatedcol()

    if (!!this.mytable) {
      const myselcol = tools.getCookie(this.mytable, '')
      if (!!myselcol && myselcol.length > 0) {
        this.colVisib = myselcol.split('|')
      }
    }

    this.refresh()
  }

  get tools() {
    return tools
  }

  get db_fieldsTable() {
    return fieldsTable
  }

  public doSearch() {
    this.refresh()
  }

  public changefuncAct(newval) {
    tools.setCookie(tools.CAN_EDIT, newval)
  }

}
