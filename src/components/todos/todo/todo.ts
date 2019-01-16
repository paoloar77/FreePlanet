import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '@components'
import { ITodo } from '@src/model'

import { rescodes } from '../../../store/Modules/rescodes'

import { UserStore } from '@modules'

import _ from 'lodash'

import draggable from 'vuedraggable'

@Component({
  components: { SingleTodo, draggable }
})
export default class Todo extends Vue {
  $q: any

  filter: boolean = false
  title: string = ''
  todo: string = ''
  todos_arr: any[] = [{}]
  drag: boolean = true
  startpos: number = 0
  endpos: number = 0

  @Watch('drag') changedrag() {
    console.log('drag = ' + this.drag)
  }

  change(param) {
    console.log('Change... ' + param)
  }

  onStart() {
    this.startpos = 0
  }

  getpos(indelem) {
    return this.todos_arr[indelem].pos
  }

  onEnd(myvar) {
    let oldpos = this.getpos(myvar.oldIndex)
    let newpos = this.getpos(myvar.newIndex)

    console.log('onEnd old = ' + oldpos + ' new = ' + newpos)
    if (myvar.oldIndex < myvar.newIndex) {
      // c'è spazio
      newpos = oldpos - 1
      if (newpos <= 0)
        newpos = 1
    } else {
      newpos = newpos + 1
    }

    console.log('newpos = ' + newpos)

    if (newpos >= 0) {
      let myobj = this.todos_arr[myvar.oldIndex]
      console.log('posprec = ' + myobj.pos)
      myobj.pos = newpos
      this.modify(myobj)

    }
  }


  created() {
    this.loadCat()
  }

  showlistaTodos(nomelista = '') {

    // console.log('todos_arr: ')
    this.todos_arr.forEach((todo, key) => {
      console.log('Todo n"' + key + ': ' + todo)
    })
  }

  loadCat() {
    this.updatetable()
  }

  initcat() {

    const mydateexp = new Date().setDate((new Date()).getDate() + 1)

    const objtodo: ITodo = {
      userId: UserStore.state.userId,
      descr: '',
      pos: -1,
      priority: rescodes.Todos.PRIORITY_NORMAL,
      completed: false,
      created_at: new Date(),
      modify_at: new Date(),
      expiring_at: mydateexp
    }
    return objtodo

  }

  getLastPos() {
    let max = 0
    this.todos_arr.forEach(myobj => {
      if (myobj.pos > max)
        max = myobj.pos
    })

    return max + 1

  }

  async insertTodo() {

    const objtodo = this.initcat()

    let myid = 0
    objtodo.descr = this.todo
    objtodo.pos = this.getLastPos()

    // Add to Indexdb
    await this.$db.todos.add(objtodo
    ).then(() => {
      this.updatetable()
    }).catch(err => {
      console.log('Errore: ' + err.message)
    })

    // empty the field
    this.todo = ''
  }

  getobjbyid(id) {
    let myobjtrov = null
    this.todos_arr.forEach(myobj => {
      if (myobj.id === id)
        myobjtrov = myobj
    })

    return myobjtrov
  }

  deleteitem(id) {
    // console.log('deleteitem: KEY = ', id)

    let myobjtrov = this.getobjbyid(id)

    if (myobjtrov !== null) {
      // Delete item
      this.$db.todos
        .where('id').equals(id)
        .delete()
        .then(() => {
          this.updatetable()
        })
    }
  }

  async updatetable() {
    await this.filtertodos()
  }

  async filtertodos() {

    if (this.filter) {
      // #Todo If need to filter the output database ...
      await this.$db.todos
        .where('userId').equals(UserStore.state.userId)
        .toArray()
        .then((response) => {
          Promise.all(response.map(key => key))
            .then((ristodos) => {
              this.todos_arr = ristodos
            })
        })
    } else {

      await this.$db.todos
        .where('userId').equals(UserStore.state.userId)

        .toArray().then(ristodos => {
          this.todos_arr = ristodos
        })

      this.todos_arr = _.orderBy(this.todos_arr, ['completed', 'priority', 'pos'], ['asc', 'desc', 'asc'])
    }

    this.todos_arr.map((item, index) => {
      item.pos = (index * 2) + 1
    })
    return []
  }

  updateitem(myobj) {
    console.log('updateitem')
    this.modify(myobj)
  }


  async modify(myobj) {
    await this.$db.transaction('rw', [this.$db.todos], async () => {
      const miorec = await this.$db.todos.get(myobj.id)

      miorec.modify_at = new Date()
      miorec.completed = myobj.completed
      miorec.expiring_at = myobj.expiring_at
      miorec.priority = myobj.priority
      miorec.pos = myobj.pos

      await this.$db.todos.put(miorec)

      this.updatetable()
    })

  }


}
