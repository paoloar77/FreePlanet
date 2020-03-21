<template>
  <div class="row no-wrap clBorderSmall">
    <q-icon size="sm" :name="icon" color="blue" class="column req_icon"></q-icon>
    <q-chip dense color="white" text-color="blue" class="q-ml-md column req_text">{{text}}</q-chip>
    <q-icon size="sm" :name="iconris" :color="checkifok" class="column req_icon"></q-icon>
  </div>
</template>

<script lang="ts" src="./CRequisito.ts">
</script>

<style lang="scss" scoped>
  @import './CRequisito.scss';
</style>
