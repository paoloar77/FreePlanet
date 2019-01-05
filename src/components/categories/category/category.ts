import Vue from 'vue'
import { Component } from 'vue-property-decorator'

require('./category.scss')


@Component({})
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

  async insertCategory() {

    let myid = 0
    const mycat = this.category
    // Add to Indexdb
    await this.$db.categories.add(
      { descr_it: mycat }
    ).then(ris => {
      myid = ris
    })

    // created_at: new Date(),

    // Add into the memory
    this.categories_arr.push({ descr_it: mycat, id: myid })

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
