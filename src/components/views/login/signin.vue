<template>
    <div>
        <q-page padding class="signin">
            <div class="text-center">
                <p>
                    <!--<img src="../../../assets/quasar-logo-full.svg">-->
                    <img :src="`../../../assets/`+`${env('LOGO_REG')}`">
                </p>
            </div>

            <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

            <q-field
                    :error="$v.form.username.$error"
                    :error-label="`${errorMsg('username', $v.form.username)}`"
            >
                <q-input
                        :value="form.username"
                        @change="val => { form.username = val }"
                        :before="[{icon: 'person', handler () {}}]"
                        @blur="$v.form.username.$touch"
                        :error="$v.form.username.$error"
                        :float-label="$t('reg.username')"
                />
            </q-field>

            <q-field
                    :error="$v.form.password.$error"
                    :error-label="`${errorMsg('password', $v.form.password)}`"
            >
                <q-input
                        v-model="form.password"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.form.password.$touch"
                        :error="$v.form.password.$error"
                        :float-label="$t('reg.password')"
                />
            </q-field>

            <br>

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">{{$t('login.enter')}}
                </q-btn>
            </div>
        </q-page>
    </div>
</template>

<script>
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
  } from 'vuelidate/lib/validators'

  import {mapGetters, mapActions} from 'vuex'
  import * as types from '../../../store/mutation-types'

  import {Errori_MongoDb} from '../../../store/modules/user'
  import {serv_constants} from "../../../store/modules/serv_constants";
  import axios from 'axios';

  import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'


  export default {
    data() {
      return {
        url: process.env.VUE_APP_URL,
        form: {
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD,
        },
      }
    },
    computed: {
      ...mapGetters("user", [
        'getUsername',
        'getPassword',
      ]),
      ...mapGetters("user", [
        'getUserServer',
        'getServerCode',
      ]),
      env() {
        return env
      },
    },
    validations: {
      isAsync: true,
      form: {
        password: {required, minLength: minLength(8), maxLength: maxLength(20)},
        username: {
          required, minLength: minLength(6), maxLength: maxLength(20),
        },
      }
    },
    methods: {
      ...mapActions("user", {
        signin: types.USER_SIGNIN,
      }),
      showNotif (msg) {
        this.$q.notify(msg)
      },
      errorMsg(cosa, item) {
        try {
          if (!item.$error) return '';
          if (item.$params.email && !item.email) return this.$t('reg.err.email');

          if (!item.required) return this.$t('reg.err.required');
          if (!item.minLength) return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char');
          if (!item.maxLength) return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char');
          return '';
        } catch (error) {
          //console.log("ERR : " + error);
        }
      },
      checkErrors(riscode) {
        //console.log("RIS = " + riscode);
        if (riscode === Errori_MongoDb.OK) {
          this.showNotif({type: 'positive', message: this.$t('login.completato')});
          this.$router.push('/');
        } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR) {
          this.showNotif(this.$t('login.errato'));
          this.$router.push('/signin');
        } else {
          this.showNotif("Errore num " + riscode);
        }

      },
      submit() {
        this.$v.form.$touch();

        if (this.$v.form.$error) {
          this.showNotif(this.$t('reg.err.errore_generico'));
          return
        }

        this.$q.loading.show({message: this.$t('login.incorso')});

        console.log(this.form);
        this.signin(this.form)
          .then((riscode) => {
            this.checkErrors(riscode);
            this.$q.loading.hide();
          }).catch(error => {
          console.log("ERROR = " + error);
          this.$q.loading.hide();
        });


        // ...
      }
    },
  }
</script>

<style scoped>
    .signin {
        width: 100%;
        margin: 0 auto;
        max-width: 450px;
    }
</style>
