import Vue from 'vue'
import { Watch } from 'vue-property-decorator'
import { GlobalStore } from '../../store/Modules'

export default class MenuOne extends Vue {

  @Watch('$route.path')
  private modifroute() {
    Object.keys(this.getmenu).forEach((parentName) => {
      this.setParentVisibilityBasedOnRoute(this.getmenu[parentName])
    })
  }

  // get currentRoutePath() {
  //   return this.$route.path
  // }

  get getmenu() {
    return GlobalStore.getters.getmenu
  }

  public setParentVisibilityBasedOnRoute(parent) {
    parent.routes.forEach((item) => {
      if (this.$route.path === item.route) {
        parent.show = true
        return
      }
    })
  }

  public replaceUnderlineToSpace(text) {
    while (text.indexOf('_') !== -1) {
      text = text.replace('_', ' ')
    }
    return text
  }

}
