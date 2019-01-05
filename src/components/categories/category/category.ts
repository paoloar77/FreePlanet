import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { GlobalStore } from '@store'

import VueIdb from 'vue-idb'

Vue.use(VueIdb)

require('./category.scss')

@Component({})
export default class Category extends Vue {
  idb = null
  category: string = ''
  $t: any

  created() {
    this.createdb()

    this.caricaCat()
  }

  createdb() {
    // Inserisci la Categoria nel DB
    this.idb = new VueIdb({
      version: 1,
      database: 'test',
      schemas: [
        { categories: '++id, sub_categ_id, descr_it' }
      ]
    })

  }


  caricaCat() {
    let mythis = this
    this.idb.open().then(function () {

      return mythis.idb.categories
        .toArray()

    }).then(function () {

      console.log('FINE LOAD')
    })
  }

  insertCategory(): any {
    let mythis = this

    this.idb.open().then(function () {
      console.log('Inserisci Cat: ', mythis.category)
      return mythis.idb.categories.add({ descr_it: mythis.category })

    }).then(function () {

      console.log('FINE')
    })
  }

}
