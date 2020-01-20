<template>
  <q-card class="my-card-stat text-center">
    <q-circular-progress
      show-value
      font-size="1rem"
      :value="myperc"
      :size="getsize"
      :thickness="0.25"
      color="green"
      track-color="grey-3"
      class="q-ma-sm animated"
    >

      <q-avatar v-if="imgsrc" size="60px">
        <img :src="imgsrc">
      </q-avatar>
      <div class="column q-pa-sm text-center">
        <div>
          {{ mytext }}
        </div>
        <div class="mlvalue text-h5 text-blue boldhigh"> {{ myval }} {{ textadd }}
        </div>
        <div v-if="isperc" class="cltexth4">
          ({{ myperc.toFixed(1) }} %)
        </div>
      </div>
    </q-circular-progress>
  </q-card>
</template>

<script lang="ts" src="./CCardState.ts">
</script>

<style lang="scss" scoped>
  @import './CCardState.scss';
</style>
