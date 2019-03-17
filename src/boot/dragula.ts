import Vue from 'vue'
import { Vue2Dragula } from 'vue2-dragula'

export default ({ Vue }) => {
  Vue.use(Vue2Dragula, {
    logging: {
      service: false // to only log methods in service (DragulaService)
    }
  })
}
