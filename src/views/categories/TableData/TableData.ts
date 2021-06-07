import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ICategory } from '../../../model/index'
import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
})
export default class TableData extends Vue {
  public $q: any
  public filter: boolean = false
  public title: string = ''
  public category: string = ''
  public categories_loc: any[] = [{}]
  public categories_arr: any[] = [{}]
  public selected: any [] = []
  public selectedSecond: any [] = []

  public data: any [] = [{
    id: 0,
    descr_it: 'Frozen Yogurt',
    descr_en: '',
    descr_es: ''
  },
    {
      id: 1,
      descr_it: 'Secondo',
      descr_en: '',
      descr_es: ''
    }]

  public columns: any [] = [
    {
      name: 'descr_it',
      required: true,
      label: 'IT',
      align: 'left',
      field: 'descr_it',
      sortable: true,
      classes: 'my-class'
    },
    {
      name: 'descr_en',
      label: 'EN',
      align: 'left',
      field: 'descr_en',
      sortable: true,
      classes: 'my-class'
    },
    {
      name: 'descr_es',
      label: 'ES',
      align: 'left',
      field: 'descr_es',
      sortable: true,
      classes: 'my-class'
    },
    {
      name: 'campo2bool',
      label: 'campo2bool',
      align: 'left',
      field: 'campo2bool',
      sortable: true,
      classes: 'my-class'
    }
  ]

  @Watch('categories_loc') public valueChanged() {
    this.updatetable()
  }

  public created() {
    this.loadCat()
  }

  public async loadCat() {
    await this.$db.categories.toArray().then((ris) => this.categories_loc = ris)

    this.updatetable()
  }

  public initcat() {

    const objcat: ICategory = {
      descr_it: '',
      descr_en: '',
      descr_es: '',
      campo2bool: false
    }
    return objcat

  }

  public async insertCategory() {

    const objcat = this.initcat()

    let myid = 0
    objcat.descr_it = this.category

    // Add to Indexdb
    await this.$db.categories.put(objcat
    ).then(ris => {
      myid = ris
    })

    objcat.id = myid

    // Add into the memory
    this.categories_loc.push(objcat)

    // empty the field
    this.category = ''
  }

  public async deleteCategory(myarrobj) {

    for (const myobj of myarrobj) {

      if (!!myobj.id) {
        console.log('KEY = ', myobj.id)

        // Delete item
        let deleteCount = this.$db.categories
          .where('id').equals(myobj.id)
          .delete()

        console.log('deleteCount = ', deleteCount)
        if (deleteCount > 0) {
          // Remove into the memory
          this.categories_loc.splice(this.categories_loc.indexOf(myobj), 1)

          this.updatetable()

          return deleteCount
        }
      }
    }

  }

  public updatetable() {

    this.filterCategories()
    this.categories_arr = [...this.categories_loc]

  }

  public async filterCategories() {

    if (this.filter) {
      // #Todo If need to filter the output database ...
      this.$db.categories
        .where('descr_it').notEqual('nonlovedi')
        .toArray()
        .then((response) => {
          Promise.all(response.map(key => key))
            .then((myarr) => {
              this.categories_loc = [...myarr]
              return this.categories_loc
            })
        })
    } else {
      return this.categories_loc
    }
  }

  public deleteRow() {
    console.log('SEL = ', this.selectedSecond)

    const seldel = [...this.selectedSecond]
    if (this.deleteCategory(this.selectedSecond)) {
      tools.showNotif(this.$q, `Deleted ` + (seldel.length.toString()) + ' item', {
        color: 'primary',
        icon: 'delete'
      })


    }

  }

  /*
  await db.transaction('rw', [db.friends], async () => {
  const friend = await db.friends.get(1);
  ++friend.age;
  await db.friends.put(friend);
  });
   */

  public async modify() {
    // esempio da sistemare
    await this.$db.transaction('rw', [this.$db.categories], async () => {
      const friend = await this.$db.get(1)
      ++friend.age
      await this.$db.put(friend)
    })

  }


}
