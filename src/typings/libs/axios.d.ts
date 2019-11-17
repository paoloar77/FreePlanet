import { axios } from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: axios
  }
}
