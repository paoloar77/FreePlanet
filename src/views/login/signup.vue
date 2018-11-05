<template>
    <div>
        <q-page padding class="signup">
            <div class="text-center">
                <p>
                    <!--<img src="../../../assets/quasar-logo-full.svg">-->
                    <img :src="`../../../assets/`+`${env('LOGO_REG')}`">
                </p>
            </div>

            <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

            <q-field
                    :error="$v.user.email.$error"
                    :error-label="`${errorMsg('email', $v.user.email)}`"
            >
                <q-input
                        v-model="user.email"
                        v-validate="'required|email|truthy'"
                        :value="user.email"
                        @change="val => { user.email = val }"
                        :before="[{icon: 'mail', handler () {}}]"
                        @blur="$v.user.email.$touch"
                        :error="$v.user.email.$error"
                        :float-label="$t('reg.email')"
                />
            </q-field>

            <q-field
                    :error="$v.user.username.$error"
                    :error-label="`${errorMsg('username', $v.user.username)}`"
            >
                <q-input
                        :value="user.username"
                        @change="val => { user.username = val }"
                        :before="[{icon: 'person', handler () {}}]"
                        @blur="$v.user.username.$touch"
                        :error="$v.user.username.$error"
                        :float-label="$t('reg.username')"
                />
            </q-field>

            <q-field
                    :error="$v.user.password.$error"
                    :error-label="`${errorMsg('password', $v.user.password)}`"
            >
                <q-input
                        v-model="user.password"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.user.password.$touch"
                        :error="$v.user.password.$error"
                        :float-label="$t('reg.password')"
                />
            </q-field>

            <q-field
                    :error="$v.user.repeatPassword.$error"
                    :error-label="`${errorMsg('repeatpassword', $v.user.repeatPassword)}`"
            >
                <q-input
                        v-model="user.repeatPassword"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.user.repeatPassword.$touch"
                        :error="$v.user.repeatPassword.$error"
                        :float-label="$t('reg.repeatPassword')"
                />
            </q-field>

            <q-field
                    :error="$v.user.terms.$error"
                    :error-label="`${errorMsg('terms', $v.user.terms)}`"
            >

                <q-checkbox
                        v-model="user.terms"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        color="secondary"
                        @blur="$v.user.terms.$touch"
                        :error="$v.user.terms.$error"
                        :float-label="$t('reg.terms')"
                        :label="$t('reg.terms')"
                />
            </q-field>

            <br>

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">{{$t('reg.submit')}}
                </q-btn>
            </div>

        </q-page>
    </div>
</template>

<script type="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { UserModule } from '../../store/modules/user'
  //import { IUserState } from "../../types";
  import {ErroriMongoDb} from '../../store/modules/user'

  /*
  import VeeValidate from 'vee-validate'
  Vue.use(VeeValidate)
  import { Validator } from 'vee-validate'

  Validator.extend('truthy', {
    getMessage: field => 'The ' + field + ' value is not truthy.',
    validate: value => !!value
  })
  */

  //import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

  @Component({})
  export default class Signup extends Vue  {
    duplicate_email = false
    duplicate_username = false
    user = {
      email: process.env.TEST_EMAIL,
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
      repeatPassword: process.env.TEST_PASSWORD,
      dateOfBirth: '',
      terms: true,
    }


    /*
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
      */

    /*
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
    }, */
    env() {
      return env
    }

    showNotif(msg) {
      this.$q.notify(msg)
    }

    errorMsg(cosa, item) {
      try {
        if (!item.$error) return ''
        if (item.$params.email && !item.email) return this.$t('reg.err.email')

        if (cosa === 'repeatpassword') {
          if (!item.sameAsPassword) {
            return this.$t('reg.err.sameaspassword')
          }
        }

        if (cosa === 'email') {
          //console.log("EMAIL " + item.isUnique);
          //console.log(item);
          if (!item.isUnique) return this.$t('reg.err.duplicate_email')
        } else if (cosa === 'username') {
          //console.log(item);
          if (!item.isUnique) return this.$t('reg.err.duplicate_username')
        }

        if (!item.required) return this.$t('reg.err.required')
        if (!item.minLength) return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char')
        if (!item.maxLength) return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char')
        return ''
      } catch (error) {
        //console.log("ERR : " + error);
      }
    }

    checkErrors(riscode) {
      //console.log("RIS = " + riscode);
      if (riscode === ErroriMongoDb.DUPLICATE_EMAIL_ID) {
        this.showNotif(this.$t('reg.err.duplicate_email'))
      } else if (riscode === ErroriMongoDb.DUPLICATE_USERNAME_ID) {
        this.showNotif(this.$t('reg.err.duplicate_username'))
      } else if (riscode === ErroriMongoDb.OK) {
        this.$router.push('/')
      } else {
        this.showNotif("Errore num " + riscode)
      }

    }

    submit() {
      this.$v.user.$touch()

      this.duplicate_email = false
      this.duplicate_username = false

      if (!this.user.terms) {
        this.showNotif(this.$t('reg.err.terms'))
        return
      }

      if (this.$v.user.$error) {
        this.showNotif(this.$t('reg.err.errore_generico'))
        return
      }

      this.$q.loading.show({ message: this.$t('reg.incorso') })

      console.log(this.user)
      UserModule.signup(this.user)
        .then((riscode) => {
          this.checkErrors(riscode)
          this.$q.loading.hide()
        }).catch(error => {
        console.log("ERROR = " + error)
        this.$q.loading.hide()
      })


      // ...
    }
  }

</script>

<style scoped>
    .signup {
        width: 100%;
        margin: 0 auto;
        max-width: 450px;
    }
</style>
