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
                    :error="$v.form.email.$error"
                    :error-label="`${errorMsg('email', $v.form.email)}`"
            >
                <q-input
                        v-validate="'required|email'"
                        v-model="form.email"
                        :value="form.email"
                        @change="val => { form.email = val }"
                        :before="[{icon: 'mail', handler () {}}]"
                        @blur="$v.form.email.$touch"
                        :error="$v.form.email.$error"
                        :float-label="$t('reg.email')"
                />
            </q-field>
        </q-page>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { UserModule } from '@/store/modules/user';



  @Component({})
  export default class Login extends Vue {
    form = {
      email: 'prova@prova.com',
    };

  }


</script>
