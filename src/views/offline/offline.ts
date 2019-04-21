import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
})
export default class Offline extends Vue {
  get logoimg() {
    return 'º' + process.env.LOGO_REG
  }
}
