<template>
  <div>
    <div class="text-center">
      <p>
        <logo></logo>
      </p>
    </div>

    <!--Prova URL :  {{env('PROVA_PAOLO')}}-->
    <form>
      <div class="q-gutter-xs">

        <q-input
          v-model="signin.username"
          rounded outlined dense
          @blur="$v.signin.username.$touch"
          :error="$v.signin.username.$error"
          :error-message="`${errorMsg('username', $v.signin.username)}`"
          :label="$t('reg.username_login')">


          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>
        <q-input
          v-model="signin.password"
          type="password"
          rounded outlined dense
          v-on:keyup.enter="submit()"
          @blur="$v.signin.password.$touch"
          :error="$v.signin.password.$error"
          :error-message="`${errorMsg('password', $v.signin.password)}`"
          :label="$t('reg.password')">
          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>


        <!--<q-card class="flex flex-center">-->
        <!--&lt;!&ndash;<q-btn v-if="$myconfig.socialLogin.facebook" :loading="loading" class="q-mb-md q-mr-md" rounded icon="fab fa-facebook-f" size="sm" color="blue-10" text-color="white" @click="facebook" :label="$t('components.authentication.login.facebook')"/>&ndash;&gt;-->
        <!--&lt;!&ndash;-->
        <!--<q-btn v-if="$myconfig.socialLogin.facebook" class="q-mb-md q-mr-md" rounded icon="fab fa-facebook-f" size="sm" color="blue-10" text-color="white" @click="facebook" :label="$t('components.authentication.login.facebook')"/>-->
        <!--<q-btn v-if="$myconfig.socialLogin.google" class="q-mb-md q-mr-md" rounded icon="fab fa-google" size="sm" color="deep-orange-14" text-color="white" @click="google" :label="$t('components.authentication.login.google')"/>-->
        <!--&ndash;&gt;-->
        <!--</q-card>-->

        <div align="center">
          <q-btn rounded size="md" color="primary" @click="submit"
                 :disable="$v.$error || iswaitingforRes">{{$t('login.enter')}}
          </q-btn>
        </div>

        <br>

        <div class="text-center" style="margin-bottom: 10px;">
          <a :href="getlinkforgetpwd()" style="color:gray;">{{$t('reg.forgetpassword')}}</a>
        </div>

        <div v-if="static_data.functionality.ENABLE_REGISTRATION && showregbutt" align="center" style="margin-top:10px;">
          Se non sei ancora Registrato:<br>
          <q-btn rounded size="md" color="primary" to="/signup" :label="$t('reg.submit')">
          </q-btn>
        </div>

      </div>
    </form>
  </div>
</template>

<script lang="ts" src="./CSignIn.ts">
</script>

<style lang="scss" scoped>
  @import './CSignIn.scss';
</style>
