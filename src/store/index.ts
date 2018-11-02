import Vue from 'vue'
import Vuex from 'vuex'

//import glob from './modules/glob';

import {IUserState} from './types'

Vue.use(Vuex);

export interface IRootState {
    //app: IAppState;
    user: IUserState;
    //tagsView: ITagsViewState;
    role: IRootState;
}

//const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<IRootState>({
});


/*
Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
});
*/
/*
export default new Vuex.Store({
    state: {
        version: '1.0.0',
    },
    modules: {
        glob,
        user,
    },

    //strict: debug,
    //plugins: debug ? [createLogger()] : []
});
*/
