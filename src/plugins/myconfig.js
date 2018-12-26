// import something here
import myconfig from '../myconfig'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  //Vue.use(myconfig);
  // something to do
  Vue.prototype.$myconfig = myconfig
}
