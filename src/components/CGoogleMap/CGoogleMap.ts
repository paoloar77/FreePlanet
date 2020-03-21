import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CGoogleMap'
})

export default class CGoogleMap extends Vue {
  @Prop({ required: true, default: 'one' }) public tab

  public map = null

  public initMap() {

    // this.map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: { lat: -34.397, lng: 150.644 },
    //   zoom: 8
    // })
  }

  public async mounted() {
    // await this.$google()
    // this.initMap()
  }

}
