<template>
    <div class="mypanel">

        <div v-if="!emailinviata">
            <q-alert color="primary q-title" style="text-align: center;">
                {{ $t('reset.title_reset_pwd')}}
            </q-alert>
            <br>

            <q-field
                    :error="$v.form.email.$error"
                    :error-label="`${errorMsg('email', $v.form.email)}`"
            >
                <q-input
                        v-model="form.email"
                        autocomplete="email"
                        @change="val => { form.email = val }"
                        :before="[{icon: 'mail', handler () {}}]"
                        @blur="$v.form.email.$touch"
                        :error="$v.form.email.$error"
                        :float-label="$t('reg.email')"
                />
            </q-field>

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">
                    {{$t('login.send_reset_pwd')}}
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
  import { rescodes } from '../../../store/Modules/rescodes'

  import {serv_constants} from '../../store/Modules/serv_constants'


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
        requestresetpwd: types.USER_REQUESTRESETPWD,
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
      this.requestresetpwd(this.form)
        .then((ris) => {
          if (ris.code === serv_constants.RIS_CODE_OK)
            this.emailsent = true;
          this.$q.loading.hide();
        }).catch(err => {
        console.log("ERROR = " + err.error);
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
