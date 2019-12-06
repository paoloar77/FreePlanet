import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '@store'

@Component({})
export default class TableOnlyView extends Vue {
  public loading: boolean = false
  public serverPagination: {
    page: number ,
    rowsNumber: number // specifying this determines pagination is server-side
  } = {page: 1, rowsNumber: 10}

  public serverData: any [] = []
  public columns: any[] = [
    {
      name: 'chiave',
      required: true,
      label: 'Chiave',
      align: 'left',
      field: 'chiave',
      sortable: true
    },
    { name: 'valore', label: 'Valore', field: 'valore', sortable: false }
  ]

  public filter: string = ''
  public selected: any[] = []

  public request(props) {
    this.loading = true
    setTimeout(() => {
      this.serverPagination = props.pagination
      let table = this.$refs.table,
        rows = GlobalStore.state.cfgServer.slice(),
        { page, rowsPerPage, sortBy, descending } = props.pagination

      // if (props.filter) {
      //   rows = table.filterMethod(rows, props.filter)
      // }
      // if (sortBy) {
      //   rows = table.sortMethod(rows, sortBy, descending)
      // }

      this.serverPagination.rowsNumber = rows.length
      if (rowsPerPage) {
        rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
      }
      this.serverData = rows
      this.loading = false
    }, 1500)
  }

  public mounted() {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
