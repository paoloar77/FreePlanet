import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { SingleCat } from '@components'
import { ICategory } from '@src/model'

require('./category.scss')


@Component({
  components: { SingleCat }
})
export default class Category extends Vue {
  filter: boolean = false
  category: string = ''
  categories_arr: any[] = null

  created() {
    this.loadCat()
  }

  async loadCat() {
    await this.$db.categories.toArray().then(ris => this.categories_arr = ris)

    this.updatetable()
  }

  initcat() {

    const objcat: ICategory = {
      id: 0,
      descr_it: '',
      descr_en: '',
      descr_es: ''
    }
    return objcat

  }

  async insertCategory() {

    const objcat = this.initcat()

    let myid = 0
    objcat.descr_it = this.category

    // Add to Indexdb
    await this.$db.categories.add(objcat
    ).then(ris => {
      myid = ris
    })

    // created_at: new Date(),

    objcat.id = myid

    // Add into the memory
    this.categories_arr.push(objcat)

    this.updatetable()
  }

  updatetable() {

    this.filterCategories()

  }

  async filterCategories() {

    if (this.filter) {
      // #Todo If need to filter the output database ...
      this.$db.categories
        .where('descr_it').notEqual('nonlovedi')
        .toArray()
        .then((response) => {
          Promise.all(response.map(key => key))
            .then((myarr) => {
              this.categories_arr = [...myarr]
              return this.categories_arr
            })
        })
    } else {
      return this.categories_arr
    }
  }

}
