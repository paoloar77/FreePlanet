import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'
import { ICategory } from '../../model'
import { Footer } from '../../components/Footer/index'

@Component({
  name: 'PagePolicy',
  components: { Footer }
})
export default class PagePolicy extends Vue {
  @Prop({required: true}) public owneremail: string
  @Prop({required: true}) public SiteName: string
  @Prop({required: true}) public ownerDataName: string
  @Prop({required: true}) public managerData: string
  @Prop({required: true}) public includeData: string
  @Prop({required: true}) public url: string
  @Prop({required: true}) public lastdataupdate: string

}
