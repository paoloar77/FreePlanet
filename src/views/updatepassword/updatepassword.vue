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

      <div class="column">

        <q-input
          v-model="form.password"
          type="password"
          rounded outlined
          @blur="$v.form.password.$touch"
          :error="$v.form.password.$error"
          :error-message="`${errorMsg('password', $v.form.password)}`"
          maxlength="30"
          :label="$t('reg.password')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <q-input
          v-model="form.repeatPassword"
          type="password"
          maxlength="30"
          rounded outlined
          @blur="$v.form.repeatPassword.$touch"
          :error="$v.form.repeatPassword.$error"
          :error-message="`${errorMsg('repeatpassword', $v.form.repeatPassword)}`"

          :label="$t('reg.repeatPassword')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>


        <div align="center">
          <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">
            {{$t('reset.update_password')}}
          </q-btn>
        </div>
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

<script lang="ts" src="./updatepassword.ts">
</script>

<style lang="scss" scoped>
  @import './updatepassword';
</style>
