import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { CTodo } from '@src/components/todos/CTodo'
import { tools } from '@src/store/Modules/tools'

@Component({
  components: { CTodo },
  filters: {
    capitalize(value) {
      return tools.capitalize(value)
    }
  }

})
export default class TodoList extends Vue {
  public categoryAtt: string = ''

  @Watch('$route.params.category')
  public changecat() {
    this.categoryAtt = this.$route.params.category
    console.log('this.categoryAtt', this.categoryAtt)
  }

  public created() {
    console.log('LOAD TODO-LIST....')

    this.changecat()
  }
}
