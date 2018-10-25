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
                    :error="$v.form.email.$error"
                    :error-label="`${errorMsg('email', $v.form.email)}`"
            >
                <q-input
                        v-model="form.email"
                        :value="form.email"
                        @change="val => { form.email = val }"
                        :before="[{icon: 'mail', handler () {}}]"
                        @blur="$v.form.email.$touch"
                        :error="$v.form.email.$error"
                        :float-label="$t('reg.email')"
                />
            </q-field>

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

            <q-field
                    :error="$v.form.repeatPassword.$error"
                    :error-label="`${errorMsg('repeatpassword', $v.form.repeatPassword)}`"
            >
                <q-input
                        v-model="form.repeatPassword"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.form.repeatPassword.$touch"
                        :error="$v.form.repeatPassword.$error"
                        :float-label="$t('reg.repeatPassword')"
                />
            </q-field>

            <q-field
                    :error="$v.form.terms.$error"
                    :error-label="`${errorMsg('terms', $v.form.terms)}`"
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

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">{{$t('reg.submit')}}
                </q-btn>
            </div>
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


  export default {
    data() {
      return {
        url: process.env.VUE_APP_URL,
        form: {
          email: process.env.TEST_EMAIL,
          username: process.env.TEST_USERNAME,
          password: process.env.TEST_PASSWORD,
          repeatPassword: process.env.TEST_PASSWORD,
          dateOfBirth: '',
          terms: true,
        },
        duplicate_email: false,
        duplicate_username: false,
      }
    },
    computed: {
      ...mapGetters("user", [
        'getUsername',
        'getPassword',
        'getEmail',
        'getDateOfBirth',
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
        email: {
          required, email,
          isUnique: value => {
            if (value === '') return true;
            return axios.get(process.env.MONGODB_HOST + '/email/' + value)
              .then(res => {
                return (res.status !== 200)
              }).catch((e) => {
                return true;
              })
          }
        },
        password: {required, minLength: minLength(8), maxLength: maxLength(20)},
        username: {
          required, minLength: minLength(6), maxLength: maxLength(20),
          isUnique: value => {
            if (value === '') return true;
            return axios.get(process.env.MONGODB_HOST + '/users/' + value)
              .then(res => {
                return (res.status !== 200)
              }).catch((e) => {
                return true;
              })
          }
        },
        repeatPassword: {
          sameAsPassword: sameAs('password')
        },
        terms: {required},

      }
    },
    methods: {
      ...mapActions("user", {
        signup: types.USER_SIGNUP,
      }),
      errorMsg(cosa, item) {
        try {
          if (!item.$error) return '';
          if (item.$params.email && !item.email) return this.$t('reg.err.email');

          if (cosa === 'repeatpassword') {
            if (!item.sameAsPassword) {
              return this.$t('reg.err.sameaspassword');
            }
          }

          if (cosa === 'email') {
            //console.log("EMAIL " + item.isUnique);
            //console.log(item);
            if (!item.isUnique) return this.$t('reg.err.duplicate_email');
          } else if (cosa === 'username') {
            //console.log(item);
            if (!item.isUnique) return this.$t('reg.err.duplicate_username');
          }

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
        if (riscode === Errori_MongoDb.DUPLICATE_EMAIL_ID) {
          this.$q.notify(this.$t('reg.err.duplicate_email'));
        } else if (riscode === Errori_MongoDb.DUPLICATE_USERNAME_ID) {
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
