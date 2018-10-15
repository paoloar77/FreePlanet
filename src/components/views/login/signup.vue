<template>
    <div>
        <q-page padding class="">
            <div class="text-center">
                <p>
                    <!--<img src="../../../assets/quasar-logo-full.svg">-->
                    <img :src="`../../../assets/`+`${env('LOGO_REG')}`">
                </p>
            </div>

            <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

            <q-field
                    :helper="$t('reg.richiesto')"
                    :error="$v.form.email.$error"
                    :error-label="$t('reg.email') + ` ${errorMsg($v.form.email)}`"
            >
                <q-input
                        v-model="form.email"
                        :before="[{icon: 'mail', handler () {}}]"
                        @blur="$v.form.email.$touch"
                        :error="$v.form.email.$error"
                        :float-label="$t('reg.email')"
                />
            </q-field>

            <q-field
                    :helper="$t('reg.richiesto')"
                    :error="$v.form.username.$error"
                    :error-label="$t('reg.username') + ` ${errorMsg($v.form.username)}`"
            >
                <q-input
                        v-model="form.username"
                        :before="[{icon: 'person', handler () {}}]"
                        @blur="$v.form.username.$touch"
                        :error="$v.form.username.$error"
                        :float-label="$t('reg.username')"
                />
            </q-field>

            <q-field
                    :helper="$t('reg.richiesto')"
                    :error="$v.form.password.$error"
                    :error-label="$t('reg.password') + ` ${errorMsg($v.form.password)}`"
            >
                <q-input
                        v-model="form.password"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.form.password.$touch"
                        :error="$v.form.password.$error"
                        :float-label="$t('reg.password')"
                />
            </q-field>

            <q-field
                    :helper="$t('reg.richiesto')"
                    :error="$v.form.confirmpassword.$error"
                    :error-label="$t('reg.password') + ` ${errorMsg($v.form.confirmpassword)}`"
            >
                <q-input
                        v-model="form.confirmpassword"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.form.confirmpassword.$touch"
                        :error="$v.form.confirmpassword.$error"
                        :float-label="$t('reg.confirmpassword')"
                />
            </q-field>

            <q-field
                    :helper="$t('reg.richiesto')"
                    :error="$v.form.terms.$error"
                    :error-label="$t('reg.terms') + ` ${errorMsg($v.form.terms)}`"
            >

                <q-checkbox
                        v-model="form.terms"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        color="secondary"
                        @blur="$v.form.terms.$touch"
                        :error="$v.form.terms.$error"
                        :float-label="$t('reg.terms')"
                        :label="$t('reg.terms')"
                />
            </q-field>


            <q-btn color="primary" @click="submit" :disable="$v.$error">Submit</q-btn>
        </q-page>
    </div>
</template>

<script>
  import {
    required,
    email,
    numeric,
    minValue,
    minLength,
    maxLength,
    sameAs,
    requiredUnless
  } from 'vuelidate/lib/validators'

  import {mapGetters, mapActions} from 'vuex'
  import * as types from '../../../store/mutation-types'

  import {Errori_MongoDb} from '../../../store/modules/user'

  import axios from 'axios';

  import { debounce } from 'quasar'


  export default {
    data() {
      return {
        url: process.env.VUE_APP_URL,
        form: {
          email: process.env.TEST_EMAIL,
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD,
          confirmpassword: process.env.TEST_PASSWORD,
          dateOfBirth: '',
          terms: true,
        },
        duplicate_email: false,
        duplicate_username: false,
      }
    },
    computed: {
      ...mapGetters("glob", [
        'getUsername',
        'getPassword',
        'getEmail',
        'getDateOfBirth',
      ]),
      ...mapGetters("user", [
        'getUserServer',
        'getServerCode',
      ]),
      user() {
        //return this.getUserServer();
      },
      env() {
        return env
      },
      userIsAuthenticated() {
        return this.getUsername() !== null;
      },
    },
    validations: {
      form: {
        email: {
          required, email,
        },
        password: {required, minLength: minLength(8), maxLength: maxLength(20)},
        username: {
          required, minLength: minLength(6), maxLength: maxLength(20),
          unique: value => {
            if (value === '') return true;
            debounce(function() {
              return axios.get(process.env.MONGODB_HOST + '/users/' + value)
                .then(res => {
                  console.log("STATUS: ");
                  console.log(res.status);
                  if (res.status !== 200)
                    return true;
                  else
                    return false;
                }).then(ris => {
                  setTimeout(() => {
                    //
                    return ris;
                  }, 1000);
                })
                .catch((e) => {
                  console.log(e);
                  return true;
                })
            }, 2000);
          }
        },
        confirmpassword: {
          sameAsPassword: sameAs('password')
        },
        terms: {required},

      }
    },
    methods: {
      ...mapActions("user", {
        signup: types.USER_SIGNUP,
      }),
      errorMsg(item) {
        if (!item.$error) return '';
        if (item.$params.email && !item.email) return this.$t('reg.err.email');
        if (!item.required) return this.$t('reg.err.required');
        if (!item.minLength) return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char');
        if (!item.maxLength) return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char');
        return '';
      },
      checkErrors(riscode){
        //console.log("RIS = " + riscode);
        if (riscode === Errori_MongoDb.DUPLICATE_EMAIL_ID) {
          this.$q.notify(this.$t('reg.err.duplicate_email'));
        }else if (riscode === Errori_MongoDb.DUPLICATE_USERNAME_ID) {
            this.$q.notify(this.$t('reg.err.duplicate_username'));
        } else if (riscode === Errori_MongoDb.OK) {
          this.$router.push('/');
        } else {
          this.$q.notify("Errore num " + riscode);
        }

      },
      submit() {
        this.$v.form.$touch();

        this.duplicate_email = false;
        this.duplicate_username = false;

        if (!this.form.terms) {
          this.$q.notify(this.$t('reg.err.terms'));
          return
        }

        if (this.$v.form.$error) {
          this.$q.notify(this.$t('reg.err.errore_generico'));
          return
        }

        var mythis = this;

        console.log(this.form);
        this.signup(this.form)
          .then((riscode) => {
            this.checkErrors(riscode);
          }).catch(error => {
          console.log("ERROR = " + error);
        });

        // ...
      }
    },
  }
</script>
