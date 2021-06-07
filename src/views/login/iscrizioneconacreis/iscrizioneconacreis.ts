import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { CSignUpIscrizioneConacreis } from '../../../components/CSignUpIscrizioneConacreis'
import { CMyPage } from '../../../components/CMyPage'
import { Footer } from '../../../components/Footer'
import { CTitleBanner } from '../../../components/CTitleBanner'

@Component({
  components: { CSignUpIscrizioneConacreis, CMyPage, Footer, CTitleBanner }
})

export default class Iscrizioneconacreis extends Vue {
  public $t: any
  public adult: boolean = false

  public created() {
    // if (!tools.getCookie(tools.APORTADOR_SOLIDARIO, ''))
    //   tools.setCookie(tools.APORTADOR_SOLIDARIO, this.$route.params.invited)
  }

  get isSocio() {
    return UserStore.state.my.profile.socio
  }

}
