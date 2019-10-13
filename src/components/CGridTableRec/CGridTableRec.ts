import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { UserStore } from '../../store/Modules/index'
import { tools } from '../../store/Modules/tools'

import { shared_consts } from '../../common/shared_vuejs'
import { ICategory } from '../../model'

@Component({

})
export default class CGridTableRec extends Vue {
  @Prop({required: true}) public mytitle: string
  @Prop({required: true}) public mylist: any[]
  @Prop({required: true}) public mycolumns: any[]
  @Prop({required: true}) public colkey: string
  public $q
  public $t
  public loading: boolean = false
  public paginationControl: {
    page: number,
    rowsPerPage: number // specifying this determines pagination is server-side
  } = { page: 1, rowsPerPage: 10 }

  public serverData: any [] = []

  public idsel: string = ''
  public colsel: string = ''

  public separator: 'horizontal'
  public filter: string = ''
  public selected: any[] = []
  public dark: boolean = true

  get tableClass() {
    if (this.dark) {
      return 'bg-black'
    }
  }

  public selItem(item, colsel) {
    console.log('item', item)
    this.idsel = item._id
    this.colsel = colsel
    console.log('this.idsel', this.idsel)
  }

  public SaveValue(newVal, valinitial) {
    console.log('SaveValue', newVal, 'selected', this.selected)

    const mydata = {}

    mydata[this.colsel] = newVal
    mydata[this.colkey] = this.idsel

    console.log('this.idsel', this.idsel, 'this.colsel', this.colsel)
    console.table(mydata)

    this.$emit('save', mydata)
  }

  public created() {

    this.serverData = this.mylist.slice() // [{ chiave: 'chiave1', valore: 'valore 1' }]
  }
}
