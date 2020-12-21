import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import {
  IAction,
  IDrag, IProduct,
  IProductsState, ITodo, ITodosState,
  TypeProj
} from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { lists } from '../../../store/Modules/lists'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects, Todos } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'

import { date, Screen } from 'quasar'
import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'
import { RouteNames } from '@src/router/route-names'
import { CProductCard } from '@src/components/CProductCard'
import { Action } from 'vuex'
import Products from '@src/store/Modules/Products'

const namespace: string = 'Products'

@Component({
  name: 'ProductsList',
  components: { SingleProject, CProgress, CTodo, CDate, CProductCard },
  filters: {
    capitalize(value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

export default class ProductsList extends Vue {
  public $q: any

  /*public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }*/

  get getProducts() {
    return Products.getters.getProducts()
  }

  public mounted() {
    Products.actions.loadProducts()
  }

}
