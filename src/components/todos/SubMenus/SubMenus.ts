import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { lists } from '@src/store/Modules/lists'
import { UserStore } from '@store'
import { ITodo } from '../../../model/index'

// Doesn't exist in quasar this ? error TS2305
// import { format } from 'quasar'
// const { between } = format

// import { filter } from 'quasar'

@Component({
  name: 'SubMenus'
})

export default class SubMenus extends Vue {

  @Prop({ required: false }) public menuPopupTodo: any[]
  @Prop({ required: false }) public itemtodo: ITodo
  public $q: any

  get lists() {
    return lists
  }

  public clickMenu(field) {
    this.$emit('clickMenu', field)
  }

  public selectSubMenu(action, field) {
    this.$emit('selectSubMenu', action, field)
  }

  public KeychangeProgress(e) {
    // between(50, 10, 20)

    if (this.itemtodo.progress > 100) {
      this.itemtodo.progress = 100
    }
    if (this.itemtodo.progress < 0) {
      this.itemtodo.progress = 0
    }

    if (e.key === 'Enter') {
      // chiudi il meno
      this.$emit('clickMenu', 0)
    }
  }

}
