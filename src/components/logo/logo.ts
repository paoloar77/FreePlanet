import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'Logo'
})
export default class Logo extends Vue {
  @Prop({ required: false, default: '' }) public mystyle: boolean

  get logoimg() {
    return '../../' + tools.getimglogo()
  }

  get logoalt() {
    return this.$t('ws.sitename')
  }
}
