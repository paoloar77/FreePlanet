import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types from '../mutation-types'
//import tools from '../../../tools/tools'

function getlang(){
  if (state.user.lang !== "")
    return state.user.lang;
  else
    return process.env.LANG_DEFAULT
}

export const Errori_MongoDb = {
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100
};

export const state = {
  user: {
    _id: '',
    email: '',
    username: null,
    idapp: process.env.APP_ID,
    password: '',
    lang: '',
    ripetipassword: '',
    dateofbirth: '',

    tokens: [{
      access: '',
      token: ''
    }],

    verified_email: false,
  },
  userServer: null,
  servercode: 0,
};

function sendRequest(url, method, mydata) {
  console.log("LANG " + getlang());
  const options = {
    method: method,
    //mode: 'no-cors',
    headers: new Headers({'content-type': 'application/json', 'x-auth': '', 'accept-language': getlang()}),
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
  getLang: state => state.user.lang,
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
  [types.USER_LANG]: (state, payload) => {
    state.user.lang = payload;
  },
  [types.USER_DATEOFBIRTH]: (state, payload) => {
    state.user.dateOfBirth = payload;
  },

  authUser(state, email, mytoken) {
    state.user.tokens.push({access: "auth", token: mytoken});
  },
  setUser(state, user) {
    state.userServer = user
  },

  setServerCode(state, servercode) {
    state.servercode = servercode;
  },
  clearAuthData(state) {
    state.tokens = [];
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
  [types.USER_LANG]: ({commit}, payload) => {
    commit(types.USER_LANG, payload)
  },
  [types.USER_DATEOFBIRTH]: ({commit}, payload) => {
    commit(types.USER_DATEOFBIRTH, payload)
  },

  [types.USER_VREG]: ({commit}, paramquery) => {
    var call = process.env.MONGODB_HOST + '/vreg';
    console.log("CALL " + call);

    let params = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      idlink: paramquery.idlink,
    };
    console.log(params);

    commit('setServerCode', Errori_MongoDb.CALLING);

    var myres;

    return sendRequest(call, "POST", params)
      .then((res) => {
        //console.log("RITORNO 1 ");
        console.log(res);
        //console.log(res.status);
        myres = res;
        if (myres.status === 200) {
          return myres.json();
        }
        commit('setServerCode', Errori_MongoDb.ERR_GENERICO);
        return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore: ' + myres.status};

      })
      .then((body) => {
        //console.log("RITORNO 2 ");
        //commit('setServerCode', myres);
        return {code: body.code, msg: body.msg};
      }).catch((err) => {
        console.log("ERROR: " + err);
        commit('setServerCode', Errori_MongoDb.ERR_GENERICO);
        return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore'};
      });
  },

  [types.USER_SIGNUP]: ({commit}, authData) => {
    var call = process.env.MONGODB_HOST + '/users';
    console.log("CALL " + call);

    let params = {
      keyappid: process.env.PAO_APP_ID,
      lang: state.user.lang,
      email: authData.email,
      password: authData.password,
      username: authData.username,
      idapp: process.env.APP_ID,
    };

    console.log(params);

    var myres = null;

    commit('setServerCode', Errori_MongoDb.CALLING);

    var x_auth_token = null;

    return sendRequest(call, "POST", params)
      .then((res) => {
        console.log("HEADERS:");

        for (let header of res.headers) {
          console.log(header);
        }

        x_auth_token = res.headers.get('x-auth');
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
          var iduser = body._id;
          var email = body.email;
          if (process.env.DEV) {
            console.log("EMAIL = " + body.email);
            console.log("IDUSER= " + iduser);
            commit('authUser', email, x_auth_token);
          }

          const now = new Date();
          //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
          const expirationDate = new Date(now.getTime() + 1000);
          localStorage.setItem('token', x_auth_token);
          localStorage.setItem('userId', iduser);
          localStorage.setItem('expirationDate', expirationDate);
          //dispatch('storeUser', authData);
          //dispatch('setLogoutTimer', myres.data.expiresIn);
          return Errori_MongoDb.OK;
        } else if (myres.status === 404) {
          if (process.env.DEV) {
            console.log("CODE = " + body.code);
          }
          return body.code;
        } else {
          if (process.env.DEV) {
            console.log("CODE = " + body.code);
          }
          return body.code;
        }
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log("ERROREEEEEEEEE");
          console.log(error);
        }
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

