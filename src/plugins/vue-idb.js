import Vue from 'vue'
import VueIdb from 'vue-idb'

export default ({ Vue }) => {
  Vue.use(VueIdb)

  // Insert here the database for IndexDB
  new VueIdb({
    database: 'mydb',
    version: 1,
    schemas: [
      { categories: '++_id, sub_categ_id, descr_it, campo2bool, campo3bool' },
      { todos: '++_id, userId, category, pos, descr, priority, completed, created_at, modify_at, completed_at, expiring_at, progress, enableExpiring' },
      { sync_todos: '++_id, userId, category, pos, descr, priority, completed, created_at, modify_at, completed_at, expiring_at, progress, enableExpiring' }
    ],
    options: {
      todos: { type: 'list', primary: 'pos', label: 'label', updated_at: 'updated_at' },
      sync_todos: { type: 'list', primary: 'pos', label: 'label', updated_at: 'updated_at' },
    }
  })
}


/*


export default new VueIdb({
  version: 1,
  database: 'test',
  schemas: [
    { categories: '++_id, sub_categ_id, descr_it' }
  ]
})
*/
