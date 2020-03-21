<template>
  <div class="text-center q-gutter-sm q-ma-sm clBorderWarning">
    <div v-if="TelegCode > 0">
      <div class="text-h5 text-center text-red">
        {{ $t('reg.teleg_auth') }} Telegram:
      </div>

      <CCopyBtn :title="$t('reg.click_per_copiare')" :texttocopy="TelegCode">

      </CCopyBtn>

      <div class="text-h6 text-center" v-html="$t('reg.teleg_torna_sul_bot')">
      </div>
    </div>

    <div v-if="!TelegVerificato" class="q-pa-sm q-gutter-sm">
      <div v-if="!TelegCode"><strong>{{ $t('components.authentication.telegram.open')}}</strong></div>
      <div class="q-ma-md">
        <q-btn rounded color="primary" icon="fab fa-telegram" :label="$t('components.authentication.telegram.openbot')"
               type="a"
               :href="getLinkBotTelegram" target="_blank"></q-btn>
        <br>
      </div>
      <strong>{{ $t('components.authentication.telegram.ifclose')}}</strong>
      <div class="q-my-sm">
        <q-img src="statics/images/ayni_bot.jpg" class="" alt="AYNI BOT" style="height: 100px; width: 250px;">
        </q-img>
      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./CVerifyTelegram.ts">
</script>

<style lang="scss" scoped>
  @import './CVerifyTelegram.scss';
</style>
