import google from '../googlemap'

export default ({ app, router, Vue }) => {
  Vue.prototype.$google = google
}
