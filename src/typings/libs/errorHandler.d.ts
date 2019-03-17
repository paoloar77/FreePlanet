import { errorHandler } from '../../error-handler'

declare module 'vue/types/vue' {
  interface Vue {
    $errorHandler: errorHandler
  }
}
