<template>
    <div class="mypanel">

        <div v-if="!emailinviata">
            <q-banner
                    rounded
                    class="bg-primary text-white"
                    style="text-align: center;">
                <span class="mybanner">{{ $t('reset.title_update_pwd')}}</span>
            </q-banner>
            <br>

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

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">
                    {{$t('reset.update_password')}}
                </q-btn>
            </div>

        </div>
        <div v-else>
            <q-banner
                    rounded
                    class="bg-primary text-white"
                    style="text-align: center;">
                <span class="mybanner">{{ $t('reset.email_sent')}}</span>
            </q-banner>
            <br>

            <div>
                {{ $t('reset.check_email')}}
            </div>

        </div>


    </div>
</template>

<script lang="ts">

  import { mapActions } from 'vuex'
  import * as types from '../../store/mutation-types'
  //import {tools} from '../../store/Modules/user'

  import { serv_constants } from '../../store/Modules/serv_constants'


  import Vue from 'vue'
  import { required } from "vuelidate/lib/validators"
  import { UserStore } from "../../store/Modules";
  import { IUserFields, IUserState } from "../../model"
  import { tools } from "../../store/Modules/tools";
  import { toolsext } from '@src/store/Modules/toolsext'

  export default class UpdatePassword extends Vue {
    emailsent = false
    form = {
      password: '',
      repeatPassword: '',
      tokenforgot: '',
    }

    created() {
      // this.load()
    }
    get emailinviata() {
        return this.emailsent
    }
    // validations: {
    //   form: {
    //     password: {
    //       required,
    //     },
    //     repeatPassword: {
    //       required,
    //       sameAsPassword: sameAs('password')
    //     },
    //   }
    // },

    submit() {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        tools.showNotif(this.$q, this.$t('reg.err.errore_generico'))
        return
      }

      this.$q.loading.show({ message: this.$t('reset.incorso') })

      this.form.tokenforgot = ''

      console.log(this.form)
      UserStore.actions.resetpwd(this.form)
        .then((ris) => {
          this.emailsent = ris.updatepwd
          this.$q.loading.hide()
        }).catch(error => {
        console.log("ERROR = " + error)
        this.$q.loading.hide()
      })

    }
  })

</script>

<style scoped>
    .mypanel {
        padding: 10px;
        margin: 10px;

    }
</style>
