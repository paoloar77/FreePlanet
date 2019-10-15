import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '../../store/Modules/index'
import { tools } from '../../store/Modules/tools'

import { shared_consts } from '../../common/shared_vuejs'
import { ICategory, IColGridTable } from '../../model'
import { CTodo } from '../todos/CTodo'
import { SingleProject } from '../projects/SingleProject'
import { lists } from '../../store/Modules/lists'

@Component({})
export default class CGridTableRec extends Vue {
  @Prop({ required: true }) public mytable: string
  @Prop({ required: true }) public mytitle: string
  @Prop({ required: true }) public mycolumns: any[]
  @Prop({ required: true }) public colkey: string
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

  public idsel: string = ''
  public colsel: string = ''
  public valPrec: string = ''

  public separator: 'horizontal'
  public filter: string = ''
  public selected: any
  public dark: boolean = true
  public funcActivated = []

  public returnedData
  public returnedCount
  public colVisib: any[] = []

  get canEdit() {
    return this.funcActivated.includes(lists.MenuAction.CAN_EDIT_TABLE)
  }

  get lists() {
    return lists
  }

  get tableClass() {
    if (this.dark) {
      return 'bg-black'
    }
  }

  public selItem(item, colsel) {
    console.log('item', item)
    this.selected = item
    this.idsel = item._id
    this.colsel = colsel
    console.log('this.idsel', this.idsel)
  }

  public undoVal() {
    console.log('undoVal', 'colsel', this.colsel, 'valprec', this.valPrec, 'this.colkey', this.colkey, 'this.selected', this.selected)
    console.table(this.serverData)
    if (this.colsel)
      this.selected[this.colsel] = this.valPrec
    // this.serverData[this.colsel] = this.valPrec

  }

  public SaveValue(newVal, valinitial) {
    console.log('SaveValue', newVal, 'selected', this.selected)

    const mydata = {
      // colkey: this.colkey,
      id: this.idsel,
      table: this.mytable,
      fieldsvalue: {

      }
    }

    mydata.fieldsvalue[this.colsel] = newVal

    console.table(mydata)

    this.valPrec = valinitial

    // console.log('this.idsel', this.idsel, 'this.colsel', this.colsel)
    // console.table(mydata)

    this.saveFieldValue(mydata)
  }

  public created() {
    // this.serverData = this.mylist.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]
    this.mycolumns.forEach((elem) => {
      if (elem.field)
        this.colVisib.push(elem.field)
    })

  }

  get getrows() {
    return this.pagination.rowsNumber
  }

  public onRequest(props) {
    const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
    const filter = props.filter

    this.loading = true

    // update rowsCount with appropriate value

    // get all rows if "All" (0) is selected
    const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage
    const endRow = startRow + fetchCount

      // fetch data from "server"
    this.fetchFromServer(startRow, endRow, filter, sortBy, descending).then((ris) => {

      this.pagination.rowsNumber = this.getRowsNumberCount(filter)

      // clear out existing data and add new
      this.serverData.splice(0, this.serverData.length, ...this.returnedData)

      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // ...and turn of loading indicator
      this.loading = false
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

    const params = {
      table: this.mytable,
      startRow,
      endRow,
      filter,
      sortBy: myobj,
      descending
    }

    console.table(params)

    const data = await GlobalStore.actions.loadTable(params)

    if (data) {
      this.returnedData = data.rows
      this.returnedCount = data.count
    } else {
      this.returnedData = []
      this.returnedCount = 0
    }

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
    return (col.disable || !this.canEdit) ? '' : 'colmodif'
  }

  public saveFieldValue(mydata) {
    console.log('saveFieldValue', mydata)

    // Save on Server
    GlobalStore.actions.saveFieldValue(mydata).then((esito) => {
      if (esito)
        tools.showPositiveNotif(this.$q, this.$t('db.recupdated'))
      else {
        tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))
        this.undoVal()
      }
    })
  }

  public mounted() {
    this.mycolumns.forEach((rec: IColGridTable) => {
      rec.label = this.$t(rec.label_trans)
    })

    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  }

  public clickFunz(item, col: IColGridTable) {
    if (col.action) {
      tools.ActionRecTable(this, col.action, this.mytable, item._id, item)
    }
  }

  public ActionAfterYes(action, item) {
    if (action === lists.MenuAction.DELETE_RECTABLE) {
      this.serverData.splice(this.serverData.indexOf(item), 1)
    }
  }

}
