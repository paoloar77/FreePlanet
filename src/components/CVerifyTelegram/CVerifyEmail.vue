<template>
  <div class="text-center q-gutter-sm q-ma-sm clBorderWarning">
    <q-chip v-if="isEmailVerified" color="positive" text-color="white" icon="email">
      {{ `Email ` + $t('pages.statusreg.verified') }}
    </q-chip>
    <q-chip v-else color="negative" text-color="white" icon="email">
      {{ `Email ` + $t('pages.statusreg.nonverified') }}
    </q-chip>
    <div v-if="!isEmailVerified" v-html="$t('components.authentication.email_verification.link_sent')">

    </div>
    <div v-if="!isEmailVerified" v-html="$t('components.authentication.email_verification.se_non_ricevo')">

    </div>


  </div>
</template>

<script lang="ts" src="./CVerifyEmail.ts">
</script>

<style lang="scss" scoped>
  @import './CVerifyEmail.scss';
</style>
