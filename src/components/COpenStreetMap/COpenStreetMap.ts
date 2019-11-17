import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { toolsext } from '@src/store/Modules/toolsext'
import { tools } from '../../store/Modules/tools'

@Component({
  name: 'COpenStreetMap'
})

export default class COpenStreetMap extends Vue {
  @Prop({required: true}) public title: string
  @Prop({required: true}) public coordinates: string
  @Prop({required: true}) public coord_big: string

  get mywidth() {
    return tools.getwidth(this) - 20
  }

  get myheight() {
    return 450
  }

}
