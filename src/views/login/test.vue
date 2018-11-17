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
            >
                <q-input
                        v-validate="'required|email'"
                        v-model="form.email"
                        :value="form.email"
                />
            </q-field>
        </q-page>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { UserStore } from '@store';


  @Component({})
  export default class Login extends Vue {
    form = {
      email: 'prova@prova.com',
    };

  }


</script>
