<template>
  <div class="row justify-center text-center padding">
    <div class="q-gutter-sm q-ma-sm" style="max-width: 800px; margin: auto;">

      <div v-if="!emailinviata">
        <q-banner
          rounded
          class="bg-primary text-white"
          style="text-align: center;">
          <span class="mybanner">{{ $t('reset.title_reset_pwd')}}</span>
        </q-banner>
        <br>

        <q-input
          v-model="form.email"
          rounded outlined
          autocomplete="email"
          @blur="$v.form.email.$touch"
          :error="$v.form.email.$error"
          :error-message="errorMsg('email', $v.form.email)"
          maxlength="50"
          debounce="1000"
          :label="$t('reg.email')">

          <template v-slot:prepend>
            <q-icon name="email"/>
          </template>

        </q-input>

        <br>

        <div align="center q-ma-sm">
          <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">
            {{$t('reset.send_reset_pwd')}}
          </q-btn>
        </div>

      </div>
      <div v-else>
        <q-banner
          rounded
          class="bg-positive text-white"
          style="text-align: center;">
          <span class="mybanner">{{ $t('reset.email_sent')}}</span>
        </q-banner>
        <br>

        <div>
          <strong>{{ $t('reset.check_email')}}</strong>
        </div>

      </div>


    </div>
  </div>
</template>

<script lang="ts" src="./requestresetpwd.ts">
</script>

<style lang="scss" scoped>
  @import './requestresetpwd';
</style>
