import Vue from 'vue'
import VueIdb from 'vue-idb'

export default ({ Vue }) => {
  Vue.use(VueIdb)

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
