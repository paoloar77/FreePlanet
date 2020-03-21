import { myconfig } from '../../myconfig'

declare module 'vue/types/vue' {
  interface Vue {
    $myconfig: myconfig
  }
}

