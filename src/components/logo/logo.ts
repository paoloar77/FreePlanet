import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'Logo'
})
export default class Logo extends Vue {
  get logoimg() {
    return '../../' + tools.getimglogo()
  }

  get logoalt() {
    return process.env.APP_NAME
  }
}
