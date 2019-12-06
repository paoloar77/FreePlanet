import VeeValidate from 'vee-validate'

export default ({ Vue }) => {
  Vue.use(VeeValidate, { inject: false })
}
