<template>
    <q-page class="flex flex-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">

        <q-btn round color="blue" icon="add" id="shareimagebutton" @click="openCreatePostModal">
            <q-spinner-facebook slot="loading"/>
        </q-btn>

        <q-field
                icon="wifi"
                :count="10"
                helper="Some helper"
        >
            <br>Conta = {{ getConta }}
        </q-field>

        <!--<q-btn
                @click="showNotification"
                color="primary"
                label="Mostra notifica"
        />-->

        <q-card id="mycard" class="mycard" :style="mystilecard">
            <q-card-title>
                Card Title
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
                Card Content
            </q-card-main>
        </q-card>

    </q-page>
</template>

<style>
    .mycard {
        visibility: hidden;
    }
</style>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'

    import HelloWorld from '@/components/HelloWorld.ts';

    import {Notify} from 'quasar'

    let deferredPrompt = null;

    export default {
        data: function () {
            return {
                text: '',
                visibile: false,
                cardvisible: 'hidden',
                displaycard: 'block',
            }
        },
        computed: {
            deferredPrompt: function () {
                return deferredPrompt;
            },
            ...mapGetters("glob", ['getConta']),
            mystilecard: function () {
                return {
                    visibility: this.cardvisible,
                    display: this.displaycard
                }
            }
        },
        methods: {
            showNotification() {
                this.$q.notify('Some other message')
            },
            ...mapActions("glob", {
                impostaconta: types.SET_VALUE,
                'setLayoutNeeded': types.SET_LAYOUT_NEEDED,
                'setIsLoginPage': types.SET_LOGIN_PAGE
            }),
            initprompt() {
                window.addEventListener('beforeinstallprompt', function (event) {
                    console.log('********************************   beforeinstallprompt fired');
                    event.preventDefault();
                    console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ');
                    deferredPrompt = event;
                    return false;
                });
            },
            start_app() {
                if (!window.Promise) {
                    window.Promise = Promise;
                }

            },
            test_fetch() {
                fetch('https:/httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    //mode: 'no-cors',
                    mode: 'cors',
                    body: JSON.stringify({message: 'Does this work?'})
                }).then(function (response) {
                    console.log(response);
                    if (response)
                        return response.json();
                    else
                        return null;
                }).then(function (data) {
                    console.log(data);
                }).catch(function (err) {
                    console.log(err);
                });
            },
            test() {
                console.log("*** INIZIA IL TEST ")
                var primise = new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (true)
                            resolve('Questo viene eseguito alla FINE ')
                        else
                            reject({code: 500, message: 'Errore Generico'});

                    }, 3000);
                });

                promise.then(function (text) {
                    console.log(text);
                }).then(function (newText) {
                    console.log(newText);
                }).catch(function (err) {
                    console.log(err.code, err.message);
                });

            },
            openCreatePostModal() {
                console.log('APERTO ! openCreatePostModal');

                this.impostaconta(this.getConta + 1);

                this.visibile = !this.visibile;

                if (this.visibile) {
                    this.displaycard = 'block';
                    this.cardvisible = 'visible';
                } else {
                    this.displaycard = 'block';
                    this.cardvisible = 'hidden';
                }

                event = deferredPrompt;

                if (event) {
                    console.log("+++++++++++++++++ FAI IL PROMPT DI EVENT !!!!!!!!!!!!!!!!!!!!! ")
                    console.log("################# FAI IL PROMPT DI EVENT ################# ")
                    event.prompt();

                    event.userChoice.then(function (choiceResult) {
                        console.log(choiceResult.outcome);

                        if (choiceResult.outcome === 'dismissed') {
                            console.log('User cancelled installation');
                        } else {
                            console.log('User added to home screen');
                        }
                    });

                    deferredPrompt = null;
                }
            }
        },
        created() {
            ///Notify.create('created...')
            console.log('created...');
            this.initprompt();
            this.start_app();
            //this.test();
            //this.test_fetch();
        }
    }
</script>
