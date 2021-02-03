import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import { GlobalStore } from '../../store/Modules'
import { static_data } from '../../db/static_data'
import { tools } from '../../store/Modules/tools'
import { IListRoutes } from '@src/model'
import { UserStore } from '@modules'

export default class MenuOne extends Vue {
  @Prop({ required: false, default: 'my-menu' }) public clBase: any

  @Watch('$route.path')
  private modifroute() {
    Object.keys(this.getmenu).forEach((parentName) => {
      this.setParentVisibilityBasedOnRoute(this.getmenu[parentName])
    })
  }

  get clBaseint(){
    return this.clBase
  }

  // get currentRoutePath() {
  //   return this.$route.path
  // }

  get isfinishLoading() {
    return GlobalStore.state.finishLoading
  }

  get tools() {
    return tools
  }

  get mythis() {
    return this
  }

  set mythis(my) {
    //
  }

  get getmenu() {
    return GlobalStore.getters.getmenu
  }

  public setParentVisibilityBasedOnRoute(parent) {
    parent.routes.forEach((item) => {
      if (this.$route.path === item.path) {
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

  get static_data() {
    return static_data
  }

  public getroute(elem) {
    if (elem.idelem) {
      return tools.getUrlByTipoProj(elem.urlroute) + elem.idelem
    } else {
      return elem.path
    }

  }

  public getmymenuclass(elem: IListRoutes) {
    let menu = this.clBaseint

    if (elem.onlyAdmin)
      menu += ' isAdmin'
    if (elem.onlyManager)
      menu += ' isManager'
    if (elem.onlySocioResidente)
      menu += ' isSocioResidente'
    if (elem.onlyDepartment)
      menu += ' isDepartment'
    if (elem.onlyTutor)
      menu += ' isTutor'
    if (elem.onlyTraduttrici)
      menu += ' isTraduttrici'

    if (elem.extraclass)
      menu += ' ' + elem.extraclass

    return menu
  }
}
