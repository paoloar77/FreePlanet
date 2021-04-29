<template>
  <div>
    <div v-if="toolsext.isLang('it')">
      <CTitleBanner title=""></CTitleBanner>
      <CImgText src="">
        <p class="cltexth3 text-green-8 q-ma-sm"><span
          class="boldhigh">Movimento </span></p>
      </CImgText>
      <div v-if="showconditions">
        <q-checkbox
          class="bg-grey-4"
          v-model="myguideline"
          color="primary"
          @input="changeval"
          :label="$t('steps.read_guidelines')">

        </q-checkbox>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./CGuidelines.ts">
</script>

<style lang="scss" scoped>
@import './CGuidelines';
</style>
