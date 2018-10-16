import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types from '../mutation-types'
import tools from '../../../tools/tools'

export const Errori_MongoDb = {
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100
};

export const state = {
  user: {
    email: '',
    username: null,
    password: '',
    ripetipassword: '',
    dateofbirth: '',

    idToken: '',
    userId: 0,
  },
  userServer: null,
  servercode: 0,
};

function sendRequest(url, method, mydata) {
  const options = {
    method: method,
    //mode: 'no-cors',
    headers: new Headers({'content-type': 'application/json'}),
    cache: "no-cache",
    body: JSON.stringify(mydata),
  };

  if (true) {
    return fetch(url, options);
  }

};


export const getters = {
  getUser: state => state.user,
  getUsername: state => state.user.username,
  getPassword: state => state.user.password,
  getDateOfBirth: state => state.user.dateofbirth,
  getUserServer: state => state.user.userServer,
  getServerCode: state => state.servercode,
};


export const mutations = {
  [types.USER_REC]: (state, payload) => {
    state.user = payload;
  },
  [types.USER_USERNAME]: (state, payload) => {
    state.user.username = payload;
  },
  [types.USER_PASSWORD]: (state, payload) => {
    state.user.password = payload;
  },
  [types.USER_EMAIL]: (state, payload) => {
    state.user.email = payload;
  },
  [types.USER_DATEOFBIRTH]: (state, payload) => {
    state.user.dateOfBirth = payload;
  },

  authUser(state, userData) {
    if (userData.email == state.user.email) {
      state.user.idToken = userData.idToken;
      state.user.userId = userData.email
    }
  },
  setUser(state, user) {
    state.userServer = user
  },

  setServerCode(state, servercode) {
    state.servercode = servercode;
  },
  clearAuthData(state) {
    state.idToken = null
    state.userId = null
  }
};


export const actions = {
  [types.USER_REC]: ({commit}, payload) => {
    commit(types.USER_REC, payload)
  },
  [types.USER_USERNAME]: ({commit}, payload) => {
    commit(types.USER_USERNAME, payload)
  },
  [types.USER_PASSWORD]: ({commit}, payload) => {
    commit(types.USER_PASSWORD, payload)
  },
  [types.USER_EMAIL]: ({commit}, payload) => {
    commit(types.USER_EMAIL, payload)
  },
  [types.USER_DATEOFBIRTH]: ({commit}, payload) => {
    commit(types.USER_DATEOFBIRTH, payload)
  },

  [types.USER_SIGNUP]: ({commit}, authData) => {
    var call = process.env.MONGODB_HOST + '/users';
    console.log("CALL " + call);

    let params = {
      keyappid: process.env.PAO_APP_ID,
      email: authData.email,
      password: authData.password,
      username: authData.username,
    };

    console.log(params);

    var myres = null;

    commit('setServerCode', Errori_MongoDb.CALLING);

    return sendRequest(call, "POST", params)
      .then((res) => {
        myres = res;
        return res.json();
      })
      .then((body) => {
        if (process.env.DEV) {
          console.log("RISULTATO ");
          console.log("STATUS " + myres.status + " " + (myres.statusText));
          console.log("BODY:");
          console.log(body);
        }

        commit('setServerCode', myres);

        commit('setUser', body);

        if (myres.status === 200) {
          var idToken = body._id;
          var email = body.email;
          if (process.env.DEV) {
            console.log("EMAIL = " + body.email);
            console.log("ID= " + idToken);
          }
          commit('authUser', {
            idToken: idToken,
            email: email
          });
          const now = new Date();
          //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
          const expirationDate = new Date(now.getTime() + 1000);
          localStorage.setItem('token', idToken);
          //localStorage.setItem('userId', myres.data.localId)
          localStorage.setItem('expirationDate', expirationDate);
          //dispatch('storeUser', authData);
          //dispatch('setLogoutTimer', myres.data.expiresIn);
          console.log("2 - FINE SIGNUP....");
          return Errori_MongoDb.OK;
        } else if (myres.status === 404) {
          if (process.env.DEV) {
            console.log("CODE = " + body.code);
          }
          console.log("2 - FINE SIGNUP....");
          return body.code;
        } else {
          if (process.env.DEV) {
            console.log("CODE = " + body.code);
          }
          console.log("2 - FINE SIGNUP....");
          return body.code;
        }
      })
      .catch( (error) => {
        console.log("ERROREEEEEEEEE");
        console.log(error);
        commit('setServerCode', Errori_MongoDb.ERR_GENERICO);
        return Errori_MongoDb.ERR_GENERICO;
      });
  },

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  Errori_MongoDb,
}

