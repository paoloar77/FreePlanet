import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

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
  name: 'ProductInfo',
  components: { SingleProject, CProgress, CTodo, CDate, CProductCard }
})

export default class ProductInfo extends Vue {
  public $q: any
  public code: string = ''

  public created() {
    console.log('created productInfo')
    console.log(this.$route)
    if (!!this.$route.params.codprod) {
      this.code = this.$route.params.codprod.toString()
    }

    console.log('this.code', this.code)
  }
}
