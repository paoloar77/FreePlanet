import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Logo } from '../../components/logo'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1200,
  scale: 0.95,
  distance: '10px',
  rotate: {
    x: 0,
    y: 0,
    z: 0
  }
  // mobile: true
})

@Component({
  components: { Logo }
})
export default class Malaga extends Vue {
  public text: string = ''
  public visibile: boolean = false
  public cardvisible: string = 'hidden'
  public displaycard: string = 'block'
  public $t: any
  // public firstClassSection: string = 'landing_background fade homep-cover-img animate-fade homep-cover-img-1'
  public firstClassSection: string = 'fade homep-cover-img animate-fade homep-cover-img-1'
  public $q
  public polling
  public slide2 = 0
  public animare: number = 0
  public test1 = GlobalStore.getters.t('piso.matr1')
  public getImmagini = [
    {title: GlobalStore.getters.t('piso.cameramatr'), subtitle: GlobalStore.getters.t('piso.matr1'),
     img: '../../statics/images/piso/camera_matrimoniale.jpg'},
    {title: GlobalStore.getters.t('piso.mat_scrivania'), subtitle: '',
      img: '../../statics/images/piso/matrimoniale_scrivania.jpg'},
    {title: GlobalStore.getters.t('piso.mat_finestra'), subtitle: '',
      img: '../../statics/images/piso/matrimoniale_finestra.jpg'},
    {title: GlobalStore.getters.t('piso.mat_armadio'), subtitle: '',
      img: '../../statics/images/piso/matrimoniale_armadio.jpg'},
    {title: GlobalStore.getters.t('piso.mat_fin2'), subtitle: '',  // 'Finestra dalla camera matrimoniale'
      img: '../../statics/images/piso/finestra_della_camera_matrimoniale.jpg'},
    {title: GlobalStore.getters.t('piso.mat_singola'), subtitle: GlobalStore.getters.t('piso.singola1'), // 'Camera singola'
      img: '../../statics/images/piso/singola_1.jpg'},
    {title: GlobalStore.getters.t('piso.sing_scrivania'), subtitle: '', // 'Scrivania singola'
      img: '../../statics/images/piso/singola_scrivania.jpg'},
    {title: GlobalStore.getters.t('piso.sing_'), subtitle: '', // 'Finestra singola'
      img: '../../statics/images/piso/singola_finestra.jpg'},
    {title: GlobalStore.getters.t('piso.sing_armadio'), subtitle: '', // 'Armadio singola'
      img: '../../statics/images/piso/singola_armadio.jpg'},
    {title: GlobalStore.getters.t('piso.cucina'), subtitle: '',  // 'Cucina'
      img: '../../statics/images/piso/cucina.jpg'},
    {title: GlobalStore.getters.t('piso.cucina'), subtitle: '',  // 'Cucina'
      img: '../../statics/images/piso/cucina2.jpg'},
    {title: GlobalStore.getters.t('piso.corridoio'), subtitle: '',  // 'Corridoio'
      img: '../../statics/images/piso/corridoio.jpg'},
    {title: GlobalStore.getters.t('piso.tv'), subtitle: '', // 'Televisore e Wifi'
      img: '../../statics/images/piso/televisore.jpg'},
    {title: GlobalStore.getters.t('piso.terrazza'), subtitle: '',  // 'Terrazza'
      img: '../../statics/images/piso/terrazza.jpg'},
    {title: GlobalStore.getters.t('piso.terrazza_vista'), subtitle: '',  // 'Vista dalla terrazza'
      img: '../../statics/images/piso/fuori_dalla_terrazza.jpg'},
    {title: GlobalStore.getters.t('piso.sala'), subtitle: '',  // 'Sala'
      img: '../../statics/images/piso/sala.jpg'},
    {title: GlobalStore.getters.t('piso.divano'), subtitle: '',  // 'Divano'
      img: '../../statics/images/piso/divano.jpg'},
    {title: GlobalStore.getters.t('piso.corridoio'), subtitle: '',  // 'Corridoio'
      img: '../../statics/images/piso/corridoio2.jpg'},
    {title: GlobalStore.getters.t('piso.tavolo_sala'), subtitle: '',  // 'Tavolo della sala'
      img: '../../statics/images/piso/tavolo_sala.jpg'},
    {title: GlobalStore.getters.t('piso.bagno'), subtitle: '',  // 'Bagno'
      img: '../../statics/images/piso/bagno.jpg'},
    {title: GlobalStore.getters.t('piso.vasca'), subtitle: '',  // 'Vasca con Doccia'
      img: '../../statics/images/piso/bagno2.jpg'}
  ]

  public getenv(myvar) {
    return process.env[myvar]
  }

}
