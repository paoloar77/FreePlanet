import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '@store'


@Component({})
export default class CfgServer extends Vue {
  public loading: boolean = false
  public paginationControl: {
    page: number,
    rowsPerPage: number // specifying this determines pagination is server-side
  } = { page: 1, rowsPerPage: 20 }

  public pagination: {
    page: number
  } = {page: 1 }

  public serverData: any [] = GlobalStore.state.cfgServer.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]
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

  public visibleColumns: ['chiave', 'valore']
  public separator: 'horizontal'
  public filter: string = ''
  public selected: any[] = []
  public dark: boolean = true

  public keysel: string = ''

  get tableClass () {
    if (this.dark) {
      return 'bg-black'
    }
  }

  selItem(item) {
    console.log('item', item)
    this.keysel = item.chiave
    console.log('this.keysel', this.keysel)
  }

  SaveValue(newVal, valinitial) {
    console.log('SaveValue', newVal, 'selected', this.selected)

    const mydata = {
      chiave: this.keysel,
      valore: newVal
    }
    // Save on Server
    GlobalStore.actions.saveCfgServerKey(mydata)
  }

  created() {
    this.serverData = GlobalStore.state.cfgServer.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]
    // this.serverData = GlobalStore.state.cfgServer.slice()
  }

}
