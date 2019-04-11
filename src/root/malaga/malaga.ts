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
  public getImmagini = [
    {title: 'Camera matrimoniale', subtitle: '320€ al mese: da maggio fino a settembre',
     img: '../../statics/images/piso/camera_matrimoniale.jpg'},
    {title: 'Scrivania - matrimoniale', subtitle: '',
      img: '../../statics/images/piso/matrimoniale_scrivania.jpg'},
    {title: 'Finestra - matrimoniale', subtitle: '',
      img: '../../statics/images/piso/matrimoniale_finestra.jpg'},
    {title: 'Armadio - matrimoniale', subtitle: '',
      img: '../../statics/images/piso/matrimoniale_armadio.jpg'},
    {title: 'Finestra dalla camera matrimoniale', subtitle: '',
      img: '../../statics/images/piso/finestra_della_camera_matrimoniale.jpg'},
    {title: 'Camera singola', subtitle: '220€ al mese: da maggio fino a settembre',
      img: '../../statics/images/piso/singola_1.jpg'},
    {title: 'Scrivania singola', subtitle: '',
      img: '../../statics/images/piso/singola_scrivania.jpg'},
    {title: 'Finestra singola', subtitle: '',
      img: '../../statics/images/piso/singola_finestra.jpg'},
    {title: 'Armadio singola', subtitle: '',
      img: '../../statics/images/piso/singola_armadio.jpg'},
    {title: 'Cucina', subtitle: '',
      img: '../../statics/images/piso/cucina.jpg'},
    {title: 'Cucina', subtitle: '',
      img: '../../statics/images/piso/cucina2.jpg'},
    {title: 'Corridoio', subtitle: '',
      img: '../../statics/images/piso/corridoio.jpg'},
    {title: 'Televisore e Wifi', subtitle: '',
      img: '../../statics/images/piso/televisore.jpg'},
    {title: 'Terrazza', subtitle: '',
      img: '../../statics/images/piso/terrazza.jpg'},
    {title: 'Vista dalla terrazza', subtitle: '',
      img: '../../statics/images/piso/fuori_dalla_terrazza.jpg'},
    {title: 'Sala', subtitle: '',
      img: '../../statics/images/piso/sala.jpg'},
    {title: 'Divano', subtitle: '',
      img: '../../statics/images/piso/divano.jpg'},
    {title: 'Corridoio', subtitle: '',
      img: '../../statics/images/piso/corridoio2.jpg'},
    {title: 'Tavolo della sala', subtitle: '',
      img: '../../statics/images/piso/tavolo_sala.jpg'},
    {title: 'Bagno', subtitle: '',
      img: '../../statics/images/piso/bagno.jpg'},
    {title: 'Vasca con Doccia', subtitle: '',
      img: '../../statics/images/piso/bagno2.jpg'}
  ]

  public getenv(myvar) {
    return process.env[myvar]
  }

}
