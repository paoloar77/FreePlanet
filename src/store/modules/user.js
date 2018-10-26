import Vue from 'vue'
import Vuex from 'vuex'

var bcrypt = require('bcryptjs');

Vue.use(Vuex);

import * as types from '../mutation-types'
import {serv_constants} from "./serv_constants";

//import tools from '../../../tools/tools'

function getlang() {
  if (state.user.lang !== "")
    return state.user.lang;
  else
    return process.env.LANG_DEFAULT
}

function getTok(state) {
  if (typeof state.user.tokens[0] !== 'undefined')
    return state.user.tokens[0].token;
  else
    return '';
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

    idToken: 0,
    userId: 0,

    tokens: [{
      access: '',
      token: ''
    }],

    verified_email: false,
  },
  userServer: null,
  servercode: 0,
};

function sendRequest(state, url, method, mydata) {
  console.log("LANG " + getlang());
  var mytok = getTok(state);
  const options = {
    method: method,
    //mode: 'no-cors',
    headers: new Headers({'content-type': 'application/json', 'x-auth': mytok, 'accept-language': getlang()}),
    cache: "no-cache",
    body: JSON.stringify(mydata),
  };

  return fetch(url, options);

};


export const getters = {
  getUser: state => state.user,
  getPassword: state => state.user.password,
  getDateOfBirth: state => state.user.dateofbirth,
  getUserServer: state => state.user.userServer,
  getServerCode: state => state.servercode,
  getLang: state => state.user.lang,

  getEmail: state => state.user.email,
  getUsername: state => state.user.username,
  getVerificato: state => state.user.verified_email,
  getTok: state => getTok(state),
};


export const mutations = {
  [types.USER_REC]: (state, payload) => {
    state.user = payload;
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

  [types.USER_USERNAME]: (state, payload) => {
    state.username = payload;
  },

  authUser(state, data) {
    state.user.username = data.username;
    state.user.userId = data.userid;
    state.user.idToken = data.mytoken;
    state.user.verified_email = data.verified_email;
    state.user.tokens = [];
    state.user.tokens.push({access: "auth", token: data.mytoken});
  },
  setUser(state, user) {
    state.userServer = user
  },

  setServerCode(state, servercode) {
    state.servercode = servercode;
  },
  clearAuthData(state) {
    state.user.username = null;
    state.user.tokens = [];
    state.user.idToken = null;
    state.user.userId = null;
    state.user.verified_email = false;
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

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
      idlink: paramquery.idlink,
    };
    console.log(usertosend);

    commit('setServerCode', Errori_MongoDb.CALLING);

    var myres;

    return sendRequest(state, call, "POST", usertosend)
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
        if (body.code === serv_constants.RIS_CODE_EMAIL_VERIFIED)
          localStorage.setItem('verificato', true);
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

    //console.log("PASSW: " + authData.password);

    return bcrypt.hash(authData.password, bcrypt.genSaltSync(12))
      .then(hashedPassword => {
        let usertosend = {
          keyappid: process.env.PAO_APP_ID,
          lang: getlang(),
          email: authData.email,
          password: hashedPassword,
          username: authData.username,
          idapp: process.env.APP_ID,
        };

        console.log(usertosend);

        var myres = null;

        commit('setServerCode', Errori_MongoDb.CALLING);

        var x_auth_token = null;

        return sendRequest(state, call, "POST", usertosend)
          .then((res) => {
            myres = res;
            x_auth_token = res.headers.get('x-auth');
            if (x_auth_token) {
              return res.json();
            } else {
              return {status: 400, code: Errori_MongoDb.ERR_GENERICO}
            }
          })
          .then((body) => {
            if (process.env.DEV) {
              console.log("RISULTATO ");
              console.log("STATUS " + myres.status + " " + (myres.statusText));
              console.log("BODY:");
              console.log(body);
            }

            commit('setServerCode', myres.status);
            commit('setUser', body);

            if (myres.status === 200) {
              var iduser = body._id;
              var username = authData.username;
              if (process.env.DEV) {
                console.log("USERNAME = " + username);
                console.log("IDUSER= " + iduser);
              }

              commit('authUser', {username: username, userid: iduser, mytoken: x_auth_token, verified_email: false});

              const now = new Date();
              //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
              const expirationDate = new Date(now.getTime() + 1000);
              localStorage.setItem('username', username);
              localStorage.setItem('token', x_auth_token);
              localStorage.setItem('userId', iduser);
              localStorage.setItem('expirationDate', expirationDate);
              localStorage.setItem('verificato', false);
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
      });
  },
  [types.USER_SIGNIN]: ({commit}, authData) => {
    var call = process.env.MONGODB_HOST + '/users/login';
    console.log("LOGIN " + call);

    console.log("MYLANG = " + getlang());

    const usertosend = {
      username: authData.username,
      password: authData.password,
      idapp: process.env.APP_ID,
      keyappid: process.env.PAO_APP_ID,
      lang: getlang(),
    };

    console.log(usertosend);

    var myres = null;

    commit('setServerCode', Errori_MongoDb.CALLING);

    var x_auth_token = null;

    return sendRequest(state, call, "POST", usertosend)
      .then((res) => {
        myres = res;
        x_auth_token = res.headers.get('x-auth');
        var injson = res.json();

        if (x_auth_token || injson) {
          return injson;
        } else {
          return {status: 400, code: Errori_MongoDb.ERR_GENERICO}
        }
      })
      .then((body) => {
        if (process.env.DEV) {
          console.log("RISULTATO ");
          console.log("STATUS " + myres.status + " " + (myres.statusText));
          console.log("BODY:");
          console.log(body);
        }

        if (body.code === serv_constants.RIS_CODE_LOGIN_ERR) {
          commit('setServerCode', body.code);
          return body.code;
        }

        commit('setServerCode', myres);

        if (myres.status === 200) {
          var iduser = body._id;
          var username = authData.username;
          var verified_email = body.verified_email === "true" || body.verified_email === true;
          if (process.env.DEV) {
            console.log("USERNAME = " + username);
            console.log("IDUSER= " + iduser);
            commit('authUser', {
              username: username,
              userid: iduser,
              mytoken: x_auth_token,
              verified_email: verified_email
            });
          }

          const now = new Date();
          //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
          const expirationDate = new Date(now.getTime() + 1000);
          localStorage.setItem('username', username);
          localStorage.setItem('token', x_auth_token);
          localStorage.setItem('userId', iduser);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('isLoggedin', true);
          localStorage.setItem('verificato', verified_email);

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
  [types.USER_AUTOLOGIN]: ({commit}) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const verified_email = localStorage.getItem('verificato') === "true";
    commit('authUser', {
      username: username,
      userId: userId,
      token: token,
      verified_email: verified_email,
    })
  },
  [types.USER_LOGOUT]: ({commit}, {router}) => {

    var call = process.env.MONGODB_HOST + '/users/me/token';
    console.log("CALL " + call);

    let usertosend = {
      keyappid: process.env.PAO_APP_ID,
      idapp: process.env.APP_ID,
    };
    console.log(usertosend);

    sendRequest(state, call, "DELETE", usertosend)
      .then((res) => {
        console.log(res);

      }).catch((err) => {
      console.log("ERROR: " + err);
    }).then(() => {
      commit('clearAuthData');
    });

    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('verified_email');

    router.replace('/signin')
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

