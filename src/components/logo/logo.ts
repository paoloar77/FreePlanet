import Vue from 'vue'
import { Component } from 'vue-property-decorator'

require('./logo.scss')

import { TimelineLite, Back } from 'gsap'

@Component({

})
export default class Logo extends Vue {
  svgclass: string = 'svgclass'
  created() {
    this.animate()
  }

  animate () {
    const timeline = new TimelineLite()

    timeline.to('#sun', 5, {
      cy: 20,
      cx: 60,
      ease: Back.easeInOut // Specify an ease
    })

  }

  public logoimg() {
    return process.env.LOGO_REG
  }

}
