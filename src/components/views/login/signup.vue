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


            <q-btn color="primary" @click="submit">Submit</q-btn>
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
        }
      }
    },
    computed: {
      ...mapGetters("glob", [
        'getUsername',
        'getPassword',
        'getEmail',
        'getDateOfBirth',
      ]),
      env() {
        return env
      }
    },
    validations: {
      form: {
        email: {required, email},
        password: {required, minLength: minLength(8), maxLength: maxLength(20)},
        username: {required, minLength: minLength(6), maxLength: maxLength(20)},
        confirmpassword: {
          sameAsPassword: sameAs('password')
        },
        terms: { required },

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
      submit() {
        this.$v.form.$touch();

        if (!this.form.terms) {
          this.$q.notify(this.$t('reg.err.terms'));
          return
        }

        if (this.$v.form.$error) {
          this.$q.notify(this.$t('reg.err.errore_generico'));
          return
        }

        const formData = {
          email: this.email,
          username: this.username,
          password: this.password,
          dateOfBirth: this.dateOfBirth,
          confirmPassword: this.confirmPassword,
          terms: this.terms,
        };
        console.log(formData);
        this.signup(formData);

        // ...
      }
    },
  }
</script>
