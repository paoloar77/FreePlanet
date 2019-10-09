import { dragula } from 'vue2-dragula'

declare module 'vue/types/vue' {
  interface Vue {
    $dragula: dragula
  }
}
