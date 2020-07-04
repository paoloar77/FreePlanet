import { Component, Prop, Watch } from 'vue-property-decorator'
import { INotData } from '../../model/index'
import { tools } from '../../store/Modules/tools'
import { NotevoleStore } from '@store'
import MixinBase from '@src/mixins/mixin-base'
import { validationMixin } from 'vuelidate'
import { validations } from '../CSignUpNotevole/CSignUp-validate'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { UserStore } from '../../store/Modules'
import { GlobalStore } from '../../store'
import { CCopyBtn } from '../CCopyBtn'

import { date } from 'quasar'

@Component({
  name: 'CStatusReg',
  components: { CTitleBanner, CCardState, CCopyBtn }
})

export default class CNextZoom extends MixinBase {
  public $t

  get listacalzoom() {
    return GlobalStore.state.calzoom
  }

  get nextconf() {
    if (!!this.listacalzoom) {
      return tools.getstrTime(this.listacalzoom[0].date_start)
    }
  }

  get showzoom() {
    if (GlobalStore.state.calzoom.length > 0) {
      const mydate = GlobalStore.state.calzoom.slice(-1)[0].date_start
      const mydate_end = GlobalStore.state.calzoom.slice(-1)[0].date_end
      const datenow = tools.getDateNow()
      // console.log('date.getDateDiff(datenow, mydate, \'minutes\')', date.getDateDiff(datenow, mydate, 'minutes'))
      // if begin is in the past, take the day now
      if ((date.getDateDiff(datenow, mydate, 'minutes') > -10) && (date.getDateDiff(datenow, mydate_end, 'minutes') < 0)) {
        return true
      }
    }
    return false
  }

  public getlinkzoom(rec) {
    if (rec === null) {
      rec = {
        typeconf: tools.TYPECONF_ZOOM,
        id_conf_zoom: ''
      }
    }
    let typeconf = rec.typeconf
    if (typeconf === '')
      typeconf = tools.TYPECONF_ZOOM

    let mylink = 'https://zoom.us/j/'
    if (typeconf === tools.TYPECONF_JITSI)
      mylink = 'https://meet.jit.si/'

    if (rec.id_conf_zoom === '') {
      rec.id_conf_zoom = '6668882000'
    }

    return mylink + rec.id_conf_zoom

  }

}
