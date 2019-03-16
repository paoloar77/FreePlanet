import { track } from '../../track'

declare module 'vue/types/vue' {
  interface Vue {
    $track: track
  }
}

