import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '@src/store/Modules/tools'
import { UserStore } from '@store'
import { IProject } from '../../../model/index'

// Doesn't exist in quasar this ? error TS2305
// import { format } from 'quasar'
// const { between } = format

// import { filter } from 'quasar'

@Component({
  name: 'SubMenusProj'
})

export default class SubMenusProj extends Vue {
  public selectPriority: [] = tools.selectPriority[UserStore.state.lang]

  @Prop({ required: false }) public menuPopupProj: any[]
  @Prop({ required: false }) public itemproject: IProject
  public $q: any

  public clickMenu(field) {
    this.$emit('clickMenu', field)
  }

  public setPriority(field) {
    this.$emit('setPriority', field)
  }

  public KeychangeProgress(e) {
    // between(50, 10, 20)

    if (this.itemproject.progressCalc > 100) {
      this.itemproject.progressCalc = 100
    }
    if (this.itemproject.progressCalc < 0) {
      this.itemproject.progressCalc = 0
    }

    if (e.key === 'Enter') {
      // chiudi il meno
      this.$emit('clickMenu', 0)
    }
  }

  public create() {
    this.selectPriority = tools.selectPriority[UserStore.state.lang]

    console.log('CREAZIONE')
  }
}
