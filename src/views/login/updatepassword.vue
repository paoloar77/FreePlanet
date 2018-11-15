<template>
    <div class="mypanel">

        <div v-if="!emailinviata">
            <q-alert color="primary q-title" style="text-align: center;">
                {{ $t('reset.title_update_pwd')}}
            </q-alert>
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
            <q-alert color="primary q-title" style="text-align: center;">
                {{ $t('reset.email_sent')}}
            </q-alert>
            <br>

            <div>
                {{ $t('reset.check_email')}}
            </div>

        </div>


    </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'
  //import {ErroriMongoDb} from '../../store/Modules/user'

  import {serv_constants} from '../../store/Modules/serv_constants';


  export default {
    data() {
      return {
        risultato: '',
        riscode: 0,
        emailsent: false,
        form: {
          email: '',
          tokenforgot: 0,
        },
      }
    },
    created() {
      this.load();
    },
    computed: {
      emailinviata: function () {
        return this.emailsent
      },
    },
    validations: {
      form: {
        email: {
          required, email,
        },
      }
    },
    methods: {
      ...mapActions("user", {
        updatepwd: types.USER_UPDATEPWD,
      }),
    },
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.showNotif(this.$t('reg.err.errore_generico'));
        return
      }

      this.$q.loading.show({message: this.$t('reset.incorso')});

      this.tokenforgot = '';

      console.log(this.form);
      this.updatepwd(this.form)
        .then((ris) => {
          this.emailsent = ris.updatepwd;
          this.$q.loading.hide();
        }).catch(error => {
        console.log("ERROR = " + error);
        this.$q.loading.hide();
      });

    }
  }

</script>

<style scoped>
    .mypanel {
        padding: 10px;
        margin: 10px;

    }
</style>
