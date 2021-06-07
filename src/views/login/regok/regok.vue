<template>
  <q-page padding class="vreg">
    <div class="q-">
      <div class="q-pa-md q-gutter-sm">
        <q-banner
          rounded
          class="bg-primary text-white"
          color="primary q-title"
          style="text-align: center;">
          <span class="mybanner">{{ $t('reg.reg_ok')}}</span>
        </q-banner>
        <br>
        <div class="text-center">
          <q-icon name="fas fa-exclamation-triangle" color="warning" size="md"></q-icon>
        </div>
      </div>
      <q-banner
        v-if="!isEmailVerified"
        rounded
        class="bg-warning text-black"
        color="primary q-title"
        style="text-align: center;">
        <div class="mybanner" v-html="$t('components.authentication.email_verification.link_sent', {botname: $t('site.botname') })">

        </div>

      </q-banner>
      <br>
      <q-banner
        v-if="!isEmailVerified"
        rounded
        class="bg-warning text-black"
        color="primary q-title"
        style="text-align: center;">
        <div class="mybanner" v-html="$t('components.authentication.email_verification.se_non_ricevo')">

        </div>

      </q-banner>

    </div>
    <br>
    <br>
    <br>

    <Footer></Footer>
  </q-page>
</template>

<script lang="ts" src="./regok.ts">
</script>

<style lang="scss" scoped>
  @import './regok.scss';
</style>
