import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { TimelineLite, Back } from 'gsap'

import $ from 'jquery'
import Timeout = NodeJS.Timeout

@Component({

})
export default class Offline extends Vue {
  logoimg: string = ''

  created() {
    this.logoimg = '/assets/images/' + process.env.LOGO_REG
    this.animate()
  }

  animate () {
    const timeline = new TimelineLite()

    /*

    let mysmile = $('#smile')

    mysmile.attr('class', 'smile_hide')

    setTimeout(() => {
      mysmile.removeClass('smilevisible')
      mysmile.addClass('smile_hide')
    }, 1000)


    setTimeout(() => {
      mysmile.addClass('smilevisible')
      mysmile.removeClass('smile_hide')
    }, 10000)

    */


    /*
    timeline.to('#smile', 5, {
      cy: 20,
      cx: 60,
      ease: Back.easeInOut // Specify an ease
    })
    */

  }

}
