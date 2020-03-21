import { VueIdb } from 'vue-idb'

declare module 'vue/types/vue' {
  interface Vue {
    $db: VueIdb
  }
}
