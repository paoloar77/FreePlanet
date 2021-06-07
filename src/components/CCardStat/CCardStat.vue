<template>
  <div class="row justify-between q-pa-xs-sm">
    <div :style="' padding-right: 8px;'">
      {{mytext}}
    </div>
    <div>
      <q-badge :color="mycol">{{ myval }}</q-badge>
    </div>
  </div>


</template>

<script lang="ts" src="./CCardStat.ts">
</script>

<style lang="scss" scoped>
  @import './CCardStat.scss';
</style>
