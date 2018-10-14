import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example/index'
import glob from './modules/glob';
import user from './modules/user';
import types from './mutation-types'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
});

export default new Vuex.Store({
  modules: {
    glob,
    user,
    example
  },

  //strict: debug,
  //plugins: debug ? [createLogger()] : []
});
