import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

require('./SingleCat.scss')

import { ICategory } from '../../../model/index'

@Component({

})
export default class SingleCat extends Vue {
  @Prop({required: true}) itemcat: ICategory


  created() {

  }

  remove() {

  }

}
