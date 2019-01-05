import Vue from 'vue'
import VueIdb from 'vue-idb'

export default ({ Vue }) => {
  Vue.use(VueIdb)

  // Insert here the database for IndexDB
  new VueIdb({
    version: 1,
    database: 'test',
    schemas: [
      { categories: '++id, sub_categ_id, descr_it' }
    ]
  })
}


/*


export default new VueIdb({
  version: 1,
  database: 'test',
  schemas: [
    { categories: '++id, sub_categ_id, descr_it' }
  ]
})
*/
