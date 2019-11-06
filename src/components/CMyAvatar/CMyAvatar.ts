import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { UserStore } from '../../store/Modules'

@Component({
  name: 'CMyAvatar'
})

export default class CMyAvatar extends Vue {
  @Prop({ required: false, default: '' }) public myimg
  @Prop({ required: false, default: '40px' }) public size

  public myicon: string = ''
  public myimgint: string = ''

  get tools() {
    return tools
  }

  @Watch('GlobalStore.state.my.profile.img')
  public imgChanged() {
    // console.log('imgChanged')
    this.refresh()
  }

  @Watch('myimg')
  public imglocalChanged() {
    this.myimgint = ''
    // console.log('myimg')

    this.refresh()
  }

  public refresh() {
    if (!this.myimg) {
      this.myicon = 'fas fa-user-circle'
    } else {
      this.myimgint = this.myimg
    }
    // console.log('myimgint', this.myimgint)
  }

  public mounted() {
    this.refresh()
  }
}
