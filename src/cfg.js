import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const cfg = new Vue({
  state:{
    lang: 'it'
  },
  data: {
    cost: {
      MYAPPMOD_ATTUALE: 'freeplanet',
      //MYAPPMOD_ATTUALE: 'karpos',
      AA: ''
    }
  }
});
