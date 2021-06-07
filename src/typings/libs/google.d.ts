import { google } from '../../googlemap'

declare module 'vue/types/vue' {
  interface Vue {
    $google: google
  }
}
