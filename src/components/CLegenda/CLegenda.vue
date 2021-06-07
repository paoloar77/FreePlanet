<template>
  <div>
    <div class="row q-ml-sm q-pa-xs items-center">
      <q-icon v-if="icon" size="lg" :name="icon" color="green"></q-icon>
      <q-chip dense color="blue" text-color="white" class="q-ml-sm">{{text}}</q-chip>
    </div>
  </div>
</template>

<script lang="ts" src="./CLegenda.ts">
</script>

<style lang="scss" scoped>
  @import './CLegenda.scss';
</style>
