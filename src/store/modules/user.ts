import Vue from 'vue'
import Vuex from 'vuex'

import {Module, VuexModule, Mutation, MutationAction, Action} from 'vuex-module-decorators'

var bcrypt = require('bcryptjs');

import * as types from '@/store/mutation-types'
import {serv_constants} from "@/store/modules/serv_constants";

import {IUserState, ILinkReg, IResult, IIdToken} from '../types'

export const Errori_MongoDb = {
    CALLING: 10,
    OK: 20,
    ERR_GENERICO: -1,
    DUPLICATE_EMAIL_ID: 11000,
    DUPLICATE_USERNAME_ID: 11100
};

Vue.use(Vuex);


@Module({dynamic: true, name: 'user'})
export default class User extends VuexModule {
    // Non occorrono i getters, basta questi qui:
    _id: IUserState['_id'] = '';
    email: IUserState['email'] = '';
    username: IUserState['username'] = '';
    idapp: IUserState['idapp'] = process.env.APP_ID;
    password: IUserState['password'] = '';
    lang: IUserState['lang'] = '';
    ripetipassword: IUserState['ripetipassword'] = '';
    idToken: IUserState['idToken'] = '';
    userId: IUserState['userId'] = 0;
    tokens: IUserState['tokens'] = [];
    verified_email: IUserState['verified_email'] = false;

    servercode = 0;

    getlang(): any {
        if (this.lang !== "")
            return this.lang;
        else
            return process.env.LANG_DEFAULT;
    }

    sendRequest(url: string, method: string, mydata: any) {
        console.log("LANG " + this.getlang());
        let mytok: string = this.getTok();

        const authHeader = new Headers();
        authHeader.append('content-type', 'application/json');
        authHeader.append('x-auth', mytok);
        authHeader.append('accept-language', this.getlang());
        const configInit: RequestInit = {
            method: method,
            cache: "no-cache",
            body: JSON.stringify(mydata),
            headers: authHeader,
        };

        const request: Promise<Response> = fetch(url, configInit);
        return request;

    }

    getTok() {
        if (this.tokens) {
            if (typeof this.tokens[0] !== 'undefined')
                return this.tokens[0].token;
            else
                return '';
        } else {
            return '';
        }
    }


    @MutationAction({mutate: ['user']})
    async setpassword(newstr: string) {
        return {password: newstr}
    }

    @MutationAction({mutate: [types.USER_EMAIL]})
    async setemail(newstr: string) {
        return {email: newstr}
    }

    @MutationAction({mutate: [types.USER_LANG]})
    async setlang(newstr: string) {
        return {lang: newstr}
    }

    @Mutation
    authUser(data: IUserState) {
        this.username = data.username;
        this.userId = data.userId;
        this.idToken = data.idToken;
        this.verified_email = data.verified_email;
        this.tokens = [
            {access: "auth", token: data.idToken},
        ];
    };

    @Mutation
    UpdatePwd(data: IIdToken) {
        this.idToken = data.idToken;
        if (!this.tokens)
            this.tokens = [];
        this.tokens.push({access: "auth", token: data.idToken});
    };

    @Mutation
    setServerCode(servercode: number) {
        this.servercode = servercode;
    };

    @Mutation
    clearAuthData(): void {
        this.username = '';
        this.tokens = [];
        this.idToken = '';
        this.userId = 0;
        this.verified_email = false;
    }

    @Action({commit: types.USER_UPDATEPWD})
    resetpwd(paramquery: IUserState) {
        var call = process.env.MONGODB_HOST + '/updatepwd';
        console.log("CALL " + call);

        let usertosend = {
            keyappid: process.env.PAO_APP_ID,
            idapp: process.env.APP_ID,
            email: paramquery.email,
            password: paramquery.password,
            tokenforgot: paramquery.tokenforgot,
        };
        console.log(usertosend);

        this.setServerCode(Errori_MongoDb.CALLING);

        var myres;

        var x_auth_token: string = "";

        return this.sendRequest(call, "POST", usertosend)
            .then((res) => {
                console.log(res);
                myres = res;
                x_auth_token = String(res.headers.get('x-auth'));
                if (myres.status === 200) {
                    return myres.json();
                }
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore: ' + myres.status, resetpwd: true};

            })
            .then((body) => {
                this.UpdatePwd({idToken: x_auth_token});
                localStorage.setItem('token', x_auth_token);

                return {code: body.code, msg: body.msg};
            }).catch((err) => {
                console.log("ERROR: " + err);
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore'};
            });

    }

    @Action({commit: types.USER_REQUESTRESETPWD})
    requestpwd(paramquery: IUserState) {

        var call = process.env.MONGODB_HOST + '/requestnewpwd';
        console.log("CALL " + call);

        let usertosend = {
            keyappid: process.env.PAO_APP_ID,
            idapp: process.env.APP_ID,
            email: paramquery.email,
        };
        console.log(usertosend);

        this.setServerCode(Errori_MongoDb.CALLING);

        var myres;

        return this.sendRequest(call, "POST", usertosend)
            .then((res) => {
                console.log(res);
                myres = res;
                if (myres.status === 200) {
                    return myres.json();
                }
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore: ' + myres.status, resetpwd: true};

            })
            .then((body) => {
                return {code: body.code, msg: body.msg};
            }).catch((err) => {
                console.log("ERROR: " + err);
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore'};
            });

    }

    @Action({commit: types.USER_VREG})
    vreg(paramquery: ILinkReg) {
        var call = process.env.MONGODB_HOST + '/vreg';
        console.log("CALL " + call);

        let usertosend = {
            keyappid: process.env.PAO_APP_ID,
            idapp: process.env.APP_ID,
            idLink: paramquery.idLink,
        };
        console.log(usertosend);

        this.setServerCode(Errori_MongoDb.CALLING);

        var myres;

        return this.sendRequest(call, "POST", usertosend)
            .then((res) => {
                console.log(res);
                myres = res;
                if (myres.status === 200) {
                    return myres.json();
                }
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore: ' + myres.status};

            })
            .then((body) => {
                //console.log("RITORNO 2 ");
                //this.setServerCode(myres);
                if (body.code === serv_constants.RIS_CODE_EMAIL_VERIFIED)
                    localStorage.setItem('verificato', "1");
                return {code: body.code, msg: body.msg};
            }).catch((err) => {
                console.log("ERROR: " + err);
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return {code: Errori_MongoDb.ERR_GENERICO, msg: 'Errore'};
            });
    }

    @Action({commit: types.USER_VREG})
    signup(authData: IUserState) {
        var call = process.env.MONGODB_HOST + '/users';
        console.log("CALL " + call);

        //console.log("PASSW: " + authData.password);

        return bcrypt.hash(authData.password, bcrypt.genSaltSync(12))
            .then((hashedPassword:string) => {
                let usertosend = {
                    keyappid: process.env.PAO_APP_ID,
                    lang: this.getlang(),
                    email: authData.email,
                    password: String(hashedPassword),
                    username: authData.username,
                    idapp: process.env.APP_ID,
                };

                console.log(usertosend);

                var myres: IResult;

                this.setServerCode(Errori_MongoDb.CALLING);

                var x_auth_token: string = '';

                return this.sendRequest(call, "POST", usertosend)
                    .then((res) => {
                        myres = res;
                        x_auth_token = String(res.headers.get('x-auth'));
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

                        this.setServerCode(myres.status);

                        if (myres.status === 200) {
                            var iduser = body._id;
                            var username = authData.username;
                            if (process.env.DEV) {
                                console.log("USERNAME = " + username);
                                console.log("IDUSER= " + iduser);
                            }

                            this.authUser({
                                username: username,
                                userId: iduser,
                                idToken: x_auth_token,
                                verified_email: false
                            });

                            const now = new Date();
                            //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
                            const expirationDate = new Date(now.getTime() + 1000);
                            localStorage.setItem('username', username);
                            localStorage.setItem('token', x_auth_token);
                            localStorage.setItem('userId', iduser);
                            localStorage.setItem('expirationDate', expirationDate.toString());
                            localStorage.setItem('verificato', "0");
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
                        this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                        return Errori_MongoDb.ERR_GENERICO;
                    });
            });
    }

    @Action({commit: types.USER_SIGNIN})
    signin(authData: IUserState) {
        var call = process.env.MONGODB_HOST + '/users/login';
        console.log("LOGIN " + call);

        console.log("MYLANG = " + this.getlang());

        const usertosend = {
            username: authData.username,
            password: authData.password,
            idapp: process.env.APP_ID,
            keyappid: process.env.PAO_APP_ID,
            lang: this.getlang(),
        };

        console.log(usertosend);

        var myres: IResult;

        this.setServerCode(Errori_MongoDb.CALLING);

        var x_auth_token: string = "";

        return this.sendRequest(call, "POST", usertosend)
            .then((res) => {
                myres = res;
                x_auth_token = String(res.headers.get('x-auth'));
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
                    this.setServerCode(body.code);
                    return body.code;
                }

                this.setServerCode(myres.status);

                if (myres.status === 200) {
                    var iduser = body._id;
                    var username = authData.username;
                    var verified_email = body.verified_email === "true" || body.verified_email === true;
                    if (process.env.DEV) {
                        console.log("USERNAME = " + username);
                        console.log("IDUSER= " + iduser);
                        this.authUser({
                            username: username,
                            userId: iduser,
                            idToken: x_auth_token,
                            verified_email: verified_email
                        });
                    }

                    const now = new Date();
                    //const expirationDate = new Date(now.getTime() + myres.data.expiresIn * 1000);
                    const expirationDate = new Date(now.getTime() + 1000);
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', x_auth_token);
                    localStorage.setItem('userId', iduser);
                    localStorage.setItem('expirationDate', expirationDate.toString());
                    localStorage.setItem('isLoggedin', String(true));
                    localStorage.setItem('verificato', String(verified_email));

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
                this.setServerCode(Errori_MongoDb.ERR_GENERICO);
                return Errori_MongoDb.ERR_GENERICO;
            });
    }

    @Action({commit: types.USER_AUTOLOGIN})
    autologin() {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        const expirationDateStr = localStorage.getItem('expirationDate');
        let expirationDate = new Date(String(expirationDateStr));
        const now = new Date();
        if (now >= expirationDate) {
            return
        }
        const userId = Number(localStorage.getItem('userId'));
        const username = String(localStorage.getItem('username'));
        const verified_email = localStorage.getItem('verificato') === "1";
        this.authUser({
            username: username,
            userId: userId,
            idToken: token,
            verified_email: verified_email
        });
    }

    @Action({commit: types.USER_LOGOUT})
    logout() {

        var call = process.env.MONGODB_HOST + '/users/me/token';
        console.log("CALL " + call);

        let usertosend = {
            keyappid: process.env.PAO_APP_ID,
            idapp: process.env.APP_ID,
        };

        console.log(usertosend);
        this.sendRequest(call, "DELETE", usertosend)
            .then(
                (res) => {
                    console.log(res);
                }
            ).catch((err) => {
            console.log("ERROR: " + err);
        }).then(() => {
            this.clearAuthData();
        });

        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('verified_email');

        //router.replace('/signin')
    }

}
