import globalroutines from '../globalroutines'

export default ({ app, router, store, Vue }) => {
  // something to do
  Vue.prototype.$globalroutines = globalroutines
}


