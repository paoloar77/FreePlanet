import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '@components'
import { ITodo } from '@src/model'

require('./todo.scss')

import { rescodes } from '../../../store/Modules/rescodes'

import { UserStore } from '@modules'

import _ from 'lodash'

@Component({
  components: { SingleTodo }
})
export default class Todo extends Vue {
  $q: any

  filter: boolean = false
  title: string = ''
  todo: string = ''
  todos_arr: any[] = [{}]


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

    // objtodo.id = myid

    // Add into the memory
    // this.todos_loc.push(objtodo)

    // empty the field
    this.todo = ''
  }

  deleteitem(id) {
    // console.log('deleteitem: KEY = ', id)

    let myobjtrov = null
    this.todos_arr.forEach(myobj => {
      if (myobj.id === id)
        myobjtrov = myobj
    })

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

      // this.$db.dispatch('todosSetSort', { sort: 'pos' } )

      let coll = this.$db.todos

      await this.$db.todos
        .where('userId').equals(UserStore.state.userId)
        // .sortBy('descr')

        .toArray().then(ristodos => {
          this.todos_arr = ristodos
        })


      let reverse = []
      reverse['completed'] = true
      reverse['priority'] = true
      reverse['pos'] = true
      console.log(reverse)

      this.todos_arr = _.orderBy(this.todos_arr, ['completed', 'priority', 'pos'], ['asc', 'desc', 'asc'])
    }
    return []
  }

  /*
  await db.transaction('rw', [db.friends], async () => {
  const friend = await db.friends.get(1);
  ++friend.age;
  await db.friends.put(friend);
  });
   */

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

      await this.$db.todos.put(miorec)

      this.updatetable()
    })

  }


}
