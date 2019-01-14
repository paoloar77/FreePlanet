import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

require('./SingleTodo.scss')

import { rescodes } from '../../../store/Modules/rescodes'
import { UserStore } from '@modules'

import { ITodo } from '../../../model/index'

@Component({
  name: 'SingleTodo'
})
export default class SingleTodo extends Vue {
  public selectPriority: []
  @Prop({required: true}) itemtodo: ITodo

  @Watch('itemtodo.completed') valueChanged() {
    this.$emit('eventupdate', this.itemtodo)
  }
  @Watch('itemtodo.expiring_at') valueChanged2() {
    this.$emit('eventupdate', this.itemtodo)
  }
  @Watch('itemtodo.priority') valueChanged3() {
    this.$emit('eventupdate', this.itemtodo)
  }

  created() {
    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]
  }

  remove(id) {
    this.$emit('event', id)
  }

}
