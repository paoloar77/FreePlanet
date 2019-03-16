// import something here
import track from '../track'

// leave the export, even if you don't use it
export default ({ app, router, store, Vue }) => {
  // something to do
  Vue.prototype.$track = track
}
