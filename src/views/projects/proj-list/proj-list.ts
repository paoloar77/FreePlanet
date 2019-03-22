import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IDrag, ITodo, ITodosState } from '../../../model/index'
import { SingleTodo } from '../../../components/todos/SingleTodo/index'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Todos } from '@store'
import { UserStore } from '@store'

import { Getter, Mutation, State } from 'vuex-class'
const namespace: string = 'Todos'

@Component({

  components: { SingleTodo },
  filters: {
    capitalize(value) {
      if (!value) { return '' }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
export default class ProjList extends Vue {

  get showtype() {
    return Todos.state.showtype
  }

  set showtype(value) {
    console.log('showtype', value)
    GlobalStore.mutations.setShowType(value)
  }

  get doneTodosCount() {
    return Todos.getters.doneTodosCount(this.categoryAtt)
  }

  get menuPopupConfigTodo() {
    return tools.menuPopupConfigTodo[UserStore.state.lang]
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[UserStore.state.lang]
  }

  get TodosCount() {
    return Todos.getters.TodosCount(this.categoryAtt)
  }

  // Computed:
  get reload_fromServer() {
    return Todos.state.reload_fromServer
  }

  set reload_fromServer(value: number) {
    Todos.state.reload_fromServer = value
  }
  public $q: any
  public filter: boolean = false
  public title: string = ''
  public todotop: string = ''
  public todobottom: string = ''
  public drag: boolean = true
  public listPriorityLabel: number[] = []
  public arrPrior: number[] = []
  public itemDragStart: any = null
  public polling = null
  public loadDone: boolean = false
  public inddragging: number = -1
  public service: any
  public actualMaxPosition: number = 15
  public scrollable = true
  public tmpstrTodos: string = ''
  public categoryAtt: string = ''
  // public showtype: number = Todos.state.showtype

  public $refs: {
    single: SingleTodo[]
  }

  @Getter('projList', { namespace })
  public projList: (state: ITodosState, category: string) => ITodo[]

  public async onEnd(itemdragend) {
    console.log('************  END DRAG: ', itemdragend)
    this.inddragging = -1

    await Todos.actions.swapElems(itemdragend)

  }

  public created() {
    const $service = this.$dragula.$service
    $service.options('first',
      {
        // isContainer: function (el) {
        //   return el.classList.contains('dragula-container')
        // },
        moves(el, source, handle, sibling) {
          // console.log('moves')
          return !el.classList.contains('donotdrag') // elements are always draggable by default
        },
        accepts(el, target, source, sibling) {
          // console.log('accepts dragging '+ el.id + ' from ' + source.id + ' to ' + target.id)
          return true // elements can be dropped in any of the `containers` by default
        },
        invalid(el, handle) {
          // console.log('invalid')
          return el.classList.contains('donotdrag') // don't prevent any drags from initiating by default
        },
        direction: 'vertical'
      })
    $service.eventBus.$on('dragend', (args) => {

      const itemdragend: IDrag = {
        category: this.categoryAtt,
        newIndex: this.getElementIndex(args.el),
        oldIndex: this.getElementOldIndex(args.el)
      }

      this.onEnd(itemdragend)
    })

    $service.eventBus.$on('drag', (el, source) => {
      // mythis.inddragging = mythis.getElementIndex(el)
      console.log('+++ DRAG ind=', this.inddragging)
      this.scrollable = false
    })
    $service.eventBus.$on('drop', (el, source) => {
      console.log('+++ DROP')
      this.scrollable = true
    })

    this.load()
  }

  public mounted() {
    // console.log('*** MOUNTED ***')

    this.categoryAtt = this.$route.params.category

    if (window) {
      window.addEventListener('touchmove', (e) => {
        // console.log('touchmove')
        if (!this.scrollable) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  }

  public setarrPriority() {
    this.arrPrior = []
    const arr = tools.selectPriority[UserStore.state.lang]
    if (arr) {
      arr.forEach((rec) => {
        this.arrPrior.push(rec.value)
      })
    }
    // console.log('Array PRIOR:', this.arrPrior)
  }

  public async load() {

  }

  public beforeDestroy() {

  }

  public insertTodo(atfirst: boolean = false) {
    let descr = this.todobottom.trim()
    if (atfirst) {
      descr = this.todotop.trim()
    }

    if (descr === '') {
      return
    }

    if (UserStore.state.userId === undefined) {
      tools.showNotif(this.$q, this.$t('todo.usernotdefined'))
      return
    }

    // if (!this.isRegistered()) {
    //   // Not logged
    //   tools.showNotif(this.$q, this.$t('user.notregistered'))
    //   return
    // }

    const myobj: ITodo = {
      descr,
      category: this.categoryAtt
    }

    return Todos.actions.insertTodo({ myobj, atfirst })
      .then((data) => {

        console.log('data', data)
        // if (data !== null) {
        //   tools.showNotif(this.$q, data)
        // }

        // empty the field
        if (atfirst) {
          this.todotop = ''
        }
        else {
          this.todobottom = ''
        }
      })
  }

  public async updateitem({ myitem, field }) {
    console.log('calling MODIFY updateitem', myitem, field)
    // Update the others components...

    const itemdragend: IDrag = {
      category: this.categoryAtt,
      field,
      idelemtochange: myitem._id,
      prioritychosen: myitem.priority,
      atfirst: false
    }

    await Todos.actions.swapElems(itemdragend)

    await Todos.actions.modify({ myitem, field })

  }

  public deselectAllRows(item: ITodo, check, onlythis: boolean = false) {
    // console.log('deselectAllRows : ', item)

    for (let i = 0; i < this.$refs.single.length; i++) {

      const contr = this.$refs.single[i] as SingleTodo
      // @ts-ignore
      const id = contr.itemtodo._id
      // Don't deselect the actual clicked!
      let des = false
      if (onlythis) {
        des = item._id === id
      } else {
        des = ((check && (item._id !== id)) || (!check))
      }
      if (des) {
        // @ts-ignore
        contr.deselectAndExitEdit()
      }
    }
  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes.index.value, 10)
  }

}
