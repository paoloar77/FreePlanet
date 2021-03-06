import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '../../store/Modules/index'
import { tools } from '../../store/Modules/tools'

import { shared_consts } from '../../common/shared_vuejs'
import { ICategory, IColGridTable, IFilter, ITableRec, IPagination } from '../../model'
import { CTodo } from '../todos/CTodo'
import { SingleProject } from '../projects/SingleProject'
import { lists } from '../../store/Modules/lists'
import { IParamsQuery } from '../../model/GlobalStore'
import { fieldsTable } from '../../store/Modules/fieldsTable'
import { CMyPopupEdit } from '../CMyPopupEdit'
import { CTitleBanner } from '../CTitleBanner'
import { CMyDashboard } from '../CMyDashboard'

@Component({
  components: { CMyPopupEdit, CTitleBanner, CMyDashboard }
})
export default class CGridTableRec extends Vue {
  private addRow: string = 'Aggiungi'
  @Prop({ required: true }) public prop_mytitle: string
  @Prop({ required: false }) public prop_mytable: string
  @Prop({ required: false, default: null }) public prop_mycolumns: any[]
  @Prop({ required: false, default: '' }) public prop_colkey: string
  @Prop({ required: false, default: '' }) public prop_codeId: string
  @Prop({ required: false, default: '' }) public nodataLabel: string
  @Prop({ required: false, default: 'Aggiungi' }) public labelBtnAddRow: string
  @Prop({ required: false, default: '' }) public noresultLabel: string
  @Prop({
    required: false, default: function mydef(): object {
      return {}
    }
  }) public defaultnewrec: object
  @Prop({ required: false, default: null }) public tablesList: ITableRec[]
  @Prop({ required: false, default: null }) public arrfilters: IFilter[]
  @Prop({ required: false, default: [] }) public filterdef: number[]
  @Prop({ required: false, default: {} }) public extraparams: any
  @Prop({
    required: false,
    default: { sortBy: '', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }
  }) public pagination: IPagination

  public newRecordBool: boolean = false
  public newRecord: any = {}
  public savenewRec: boolean = false

  public mytable: string
  public mytitle: string
  public mycolumns: any[]
  public colkey: string = ''
  public search: string = ''

  public tablesel: string = ''

  public $q
  public $t
  public loading: boolean = false

  public serverData: any [] = []
  public spinner_visible: boolean = false

  public idsel: string = ''
  public colsel: IColGridTable = { name: '' }
  public valPrec: string = ''

  public separator: 'horizontal'
  public myfilter: any = ''
  public myfilterand = []
  public rowsel: any = {}
  public dark: boolean = true
  public canEdit: boolean = false

  public returnedData
  public returnedCount
  public colVisib: any[] = []
  public colExtra: any[] = []

  public rowclicksel: any = null
  public colclicksel: any = null

  public selected = []

  @Watch('prop_codeId')
  public changeprop_codeId() {
    this.refresh()
  }

  get isAdmin() {
    return UserStore.state.isAdmin
  }

  get isManager() {
    return UserStore.state.isManager
  }

  get isSocioResidente() {
    return UserStore.state.my.profile.socioresidente
  }

  get isTutor() {
    return UserStore.state.isTutor
  }

  get isZoomeri() {
    return UserStore.state.isZoomeri
  }

  get isTratuttrici() {
    return UserStore.state.isTratuttrici
  }

  get disabilita() {
    if ((this.mytable === 'users') && (this.isTutor)) {
      return true
    }

    return false
  }

  get lists() {
    return lists
  }

  get tableClass() {
    if (this.dark) {
      return 'bg-black'
    }
  }

  public selItem(item, col: IColGridTable) {
    // console.log('selItem', item)
    this.rowsel = item
    this.idsel = item._id
    this.colsel = col
  }

  public undoVal() {
    console.log('undoVal', 'colsel', this.colsel, 'valprec', this.valPrec, 'this.colkey', this.colkey, 'this.selected', this.rowsel)
    // console.table(this.serverData)
    if (this.colsel) {
      if (this.colsel.subfield !== '') {
        if (this.rowsel[this.colsel.field] === undefined)
          this.rowsel[this.colsel.field] = {}
        this.rowsel[this.colsel.field][this.colsel.subfield] = this.valPrec
      } else {
        this.rowsel[this.colsel.field] = this.valPrec
      }
    }

    // this.serverData[this.colsel] = this.valPrec

  }

  public SaveValdb(newVal, valinitial) {
    // console.log('SaveValdb', newVal)
    // console.log('SaveValue', newVal, 'rowsel', this.rowsel)

    this.colsel = this.colclicksel
    // console.log('this.colsel', this.colsel)
    this.SaveValue(newVal, valinitial)
    this.colsel = null
  }

  public showandsel(row, col, newval, valinitial) {
    // console.log('showandsel', row, col, newval)
    this.rowsel = row
    this.colsel = col
    this.idsel = row._id
    this.SaveValue(newval, valinitial)

    // this.rowclicksel = null
  }

  public annulla(val) {
    console.log('annulla')
    GlobalStore.actions.DeleteRec({ table: this.mytable, id: this.newRecord._id })
      .then((ris) => {
        return true
      })
  }

  public SaveValue(newVal, valinitial) {
    // console.log('SaveValue', newVal, 'rowsel', this.rowsel)

    if (this.colsel) {
      // Update value in table memory
      if (this.colsel.subfield !== '') {
        if (this.rowsel[this.colsel.field] === undefined)
          this.rowsel[this.colsel.field] = {}
        this.rowsel[this.colsel.field][this.colsel.subfield] = newVal
      } else {
        this.rowsel[this.colsel.field] = newVal
      }
    }

    const mydata = {
      id: this.idsel,
      table: this.mytable,
      fieldsvalue: {}
    }

    if (this.colsel.subfield !== '') {
      if (mydata.fieldsvalue[this.colsel.field] === undefined) {
        mydata.fieldsvalue[this.colsel.field + '.' + this.colsel.subfield] = newVal
      }
      // mydata.fieldsvalue[this.colsel.field][this.colsel.subfield] = newVal
    } else {
      mydata.fieldsvalue[this.colsel.field] = newVal
    }

    this.valPrec = valinitial

    this.saveFieldValue(mydata)

  }

  public beforeMount() {
    console.log('beforeMount')
  }

  public created() {
    console.log('created')
    // this.serverData = this.mylist.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]

    this.mytable = this.prop_mytable
    this.mytitle = this.prop_mytitle
    this.mycolumns = this.prop_mycolumns
    this.colkey = this.prop_colkey

    this.changeTable(false)
  }

  public updatedcol() {
    // console.log('updatedcol')
    if (this.mycolumns) {
      this.colVisib = []
      this.colExtra = []
      this.mycolumns.forEach((elem) => {
        if (elem.field !== tools.NOFIELD)
          this.colVisib.push(elem.field + elem.subfield)

        if (elem.visible && elem.field === tools.NOFIELD)
          this.colExtra.push(elem.name)

      })
    }
  }

  get getrows() {
    return this.pagination.rowsNumber
  }

  public onRequest(props) {
    // console.log('onRequest', 'myfilter = ', this.myfilter)
    const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
    const myfilter = this.myfilter
    const myfilterand = this.myfilterand

    this.savefilter()

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

    // console.log('startRow', startRow, 'endRow', endRow)

    this.serverData = []

    // fetch data from "server"
    this.fetchFromServer(startRow, endRow, myfilter, myfilterand, sortBy, descending).then((ris) => {

      this.pagination.rowsNumber = this.getRowsNumberCount(myfilter)

      // clear out existing data and add new
      if (this.returnedData === []) {
        this.serverData = []
      } else {
        // if (this.serverData.length > 0)
        //   this.serverData.splice(0, this.serverData.length, ...this.returnedData)
        // else
        this.serverData = [...this.returnedData]
      }

      // console.log('this.serverData', this.serverData)

      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // console.log('this.pagination', this.pagination)

      // ...and turn of loading indicator
      this.loading = false
      this.spinner_visible = false
    })
  }

  // emulate ajax call
  // SELECT * FROM ... WHERE...LIMIT...
  public async fetchFromServer(startRow, endRow, myfilter, myfilterand, sortBy, descending) {

    let myobj = null
    if (sortBy) {
      myobj = {}
      if (descending)
        myobj[sortBy] = -1
      else
        myobj[sortBy] = 1
    }

    let params: IParamsQuery = {
      table: this.mytable,
      startRow,
      endRow,
      filter: myfilter,
      filterand: myfilterand,
      sortBy: myobj,
      descending,
      userId: UserStore.state.my._id,
      codeId: this.prop_codeId
    }

    params = { ...params, ...this.extraparams }

    const data = await GlobalStore.actions.loadTable(params)

    if (data) {
      this.returnedData = data.rows
      this.returnedCount = data.count
    } else {
      this.returnedData = []
      this.returnedCount = 0
    }

    return true

    // if (!myfilter) {
    //   data = this.original.slice(startRow, startRow + count)
    // }
    // else {
    //   let found = 0
    //   for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
    //     let row = this.original[index]
    //     // match myfilter?
    //     if (!row['name'].includes(myfilter)) {
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
  public getRowsNumberCount(myfilter) {

    // if (!myfilter) {
    //   return this.original.length
    // }
    // let count = 0
    // this.original.forEach((treat) => {
    //   if (treat['name'].includes(myfilter)) {
    //     ++count
    //   }
    // })
    // return count

    return this.returnedCount
  }

  public async createNewRecordDialog() {

    const mydata = {
      table: this.mytable,
      data: {}
    }

    mydata.data = this.defaultnewrec

    // const mykey = fieldsTable.getKeyByTable(this.mytable)

    // mydata.data[mykey] = ''

    console.log('mydata', mydata)
    const data = await GlobalStore.actions.saveTable(mydata)

    this.newRecord = data
    this.newRecordBool = true

  }

  public async createNewRecord() {
    this.loading = true

    const mydata = {
      table: this.mytable,
      data: {}
    }

    mydata.data = this.defaultnewrec

    // const mykey = fieldsTable.getKeyByTable(this.mytable)

    // mydata.data[mykey] = ''

    console.log('mydata', mydata)
    const data = await GlobalStore.actions.saveTable(mydata)

    this.serverData.push(data)
    this.pagination.rowsNumber++

    this.loading = false
  }

  public saveFieldValue(mydata) {
    // console.log('saveFieldValue', mydata)

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
    console.log('GridTable mounted', this.tablesel)

    if (!!this.tablesList) {
      this.canEdit = tools.getCookie(tools.CAN_EDIT, this.canEdit) === 'true'
      this.tablesel = tools.getCookie('tablesel', this.tablesel)
    }
    this.myfilterand = this.filterdef
    console.log('this.tablesel', this.tablesel)

    if (this.tablesel === '') {
      if (!!this.tablesList)
        this.tablesel = this.tablesList[0].value
      else
        this.tablesel = this.mytable
    }

    console.log('2) this.tablesel', this.tablesel)

    this.changeTable(false)

  }

  public refresh() {
    this.serverData = []

    this.search = this.search.trim()

    // console.log('refresh')
    // console.log('this.search', this.search)
    if (!!this.search && this.search !== '')
      this.myfilter = this.search
    else
      this.myfilter = undefined

    // console.log('this.myfilter', this.myfilter)

    this.refresh_table()
  }

  public refresh_table() {
    this.onRequest({
      pagination: this.pagination
    })
    this.rowclicksel = null
  }

  public clickFunz(item, col: IColGridTable) {
    if (col.action) {
      tools.ActionRecTable(this, col.action, this.mytable, item._id, item, col.askaction)
    }
  }

  public ActionAfterYes(action, item, data) {
    if (action === lists.MenuAction.DELETE_RECTABLE) {
      if (this.serverData.length > 0) {
        this.serverData.splice(this.serverData.indexOf(item), 1)
        this.refresh_table()
      }
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

  public changeCol(newval) {
    console.log('changecol', this.mytable)
    if (!!this.mytable) {
      tools.setCookie(this.mytable, this.colVisib.join('|'))
    }
  }

  public changeTable(mysel) {
    if (this.tablesel === undefined || this.tablesel === '')
      return

    // console.log('changeTable mysel=', mysel, 'tablesel', this.tablesel)
    // console.log('this.tablesList=')
    // console.table(this.tablesList)

    let mytab = null
    if (this.tablesList) {
      mytab = this.tablesList.find((rec) => rec.value === this.tablesel)
    }

    if (mytab === undefined) {
      this.tablesel = this.tablesList[0].value
      if (this.tablesList) {
        mytab = this.tablesList.find((rec) => rec.value === this.tablesel)
      }
    }

    // console.log('this.tablesel', this.tablesel, 'mytab', mytab)

    if (mytab) {
      this.mytitle = mytab.label
      this.colkey = mytab.colkey
      this.mycolumns = [...mytab.columns]
    }

    // console.log('this.mycolumns')
    // console.log(this.mycolumns)
    // console.log('this.tablesList:')
    // console.table(this.tablesList)

    if (!!this.mycolumns) {
      this.mycolumns.forEach((rec: IColGridTable) => {
        if (rec.label_trans)
          rec.label = this.$t(rec.label_trans)
      })
    }

    if (mytab) {
      this.mytable = mytab.value
    }

    if (!!this.tablesList) {
      tools.setCookie('tablesel', this.tablesel)
    }

    this.updatedcol()

    if (!!this.mytable) {
      const myselcol = tools.getCookie(this.mytable, '')
      if (!!myselcol && myselcol.length > 0) {
        this.colVisib = myselcol.split('|')
      } else {
        this.mycolumns.forEach((elem) => {
          if (elem.field !== tools.NOFIELD)
            this.colVisib.push(elem.field + elem.subfield)
        })
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
    if (!this.disabilita) {
      tools.setCookie(tools.CAN_EDIT, newval)
    }
  }

  public clickrowcol(row, col) {
    if (!this.canEdit) {
      if (!this.selected[0]) {
        const uguali = this.rowclicksel._id === row._id
        console.log('id', this.rowclicksel._id, 'id2', row._id)
        this.rowclicksel = null
        this.colclicksel = null
      } else {
        this.rowclicksel = row
        this.colclicksel = col
      }
    }
  }

  public getclrow(myrow) {
    if (this.rowclicksel === myrow)
      return 'colsel'
    else
      return ''
  }

  public getSelectedString() {
    return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.serverData.length}`
  }

  public selectionclick(details) {
    // console.log('selectionclick this.selected', this.selected, 'details', details)
    if (details.added) {
      this.rowclicksel = details.rows[0]
      this.colclicksel = details.keys[0]
    } else {
      this.rowclicksel = null
      this.colclicksel = null
    }

    // console.log('this.rowclicksel', this.rowclicksel)
  }

  get getusernamesel() {
    try {
      if (this.rowclicksel) {
        return this.rowclicksel.username
      }
    } catch (e) {
      return ''
    }
  }

  @Watch('myfilterand')
  public changemyfilterand() {
    this.refresh()
  }

  public async saveNewRecord() {
    console.log('saveNewRecord')
    this.savenewRec = true
    const mydata = {
      table: this.mytable,
      data: {}
    }

    mydata.data = this.newRecord

    const data = await GlobalStore.actions.saveTable(mydata)
      .then((ris) => {
        if (ris) {
          // console.log('ris', ris)
          this.newRecordBool = false
          this.refresh()
        }
      })
  }

  public hidewindow() {
    console.log('hidewindow')
    if (!this.savenewRec) {
      this.annulla(0)
    }
  }

  get isfinishLoading() {
    return GlobalStore.state.finishLoading
  }

  get getlabelAddRow() {
    return this.labelBtnAddRow
  }

  get visButtRow() {
    return this.labelBtnAddRow !== this.addRow
  }

  public savefilter() {
    // console.log('Close')
    this.$emit('savefilter', this.myfilterand)
  }

}
