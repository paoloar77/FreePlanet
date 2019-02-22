import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { ITodo } from '../../../model/index'
import { rescodes } from '@src/store/Modules/rescodes'
import { UserStore } from '@store'

// Doesn't exist in quasar this ? error TS2305
// import { format } from 'quasar'
// const { between } = format

// import { filter } from 'quasar'

@Component({
  name: 'SubMenus'
})

export default class SubMenus extends Vue {
  public selectPriority: [] = rescodes.selectPriority[UserStore.state.lang]

  @Prop({ required: false }) menuPopupTodo: any[]
  @Prop({ required: false }) itemtodo: ITodo
  $q: any

  clickMenu (field) {
    this.$emit('clickMenu', field)
  }

  setPriority (field) {
    this.$emit('setPriority', field)
  }

  KeychangeProgress (e) {
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

  create () {
    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]

    console.log('CREAZIONE')
  }
}
