import { globalroutines } from '../../globalroutines'

declare module 'vue/types/vue' {
  interface Vue {
    $globalroutines: globalroutines
  }
}

