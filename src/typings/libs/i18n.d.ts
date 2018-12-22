import { VueI18n } from 'vue-i18n'

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: VueI18n
  }
}
