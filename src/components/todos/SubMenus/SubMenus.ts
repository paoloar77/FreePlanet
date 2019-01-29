import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { ITodo } from '../../../model/index'


@Component({
  name: 'SubMenus'
})

export default class SubMenus extends Vue {

  @Prop({ required: true }) menuPopupTodo: any[] = []
  @Prop({ required: true }) itemtodo: ITodo[] = []
  $q: any

  create () {

    console.log('CREAZIONE')
  }
}
