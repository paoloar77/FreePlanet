import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { ITodo } from '../../../model/index'
import { rescodes } from "@src/store/Modules/rescodes"
import { UserStore } from "@store"


@Component({
  name: 'SubMenus'
})

export default class SubMenus extends Vue {
  public selectPriority: [] = rescodes.selectPriority[UserStore.state.lang]

  @Prop({ required: false }) menuPopupTodo: any[]
  @Prop({ required: false }) itemtodo: ITodo[]
  $q: any

  clickMenu (field) {
    this.$emit('clickMenu', field)
  }

  setPriority (field) {
    this.$emit('setPriority', field)
  }

  create () {
    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]

    console.log('CREAZIONE')
  }
}
