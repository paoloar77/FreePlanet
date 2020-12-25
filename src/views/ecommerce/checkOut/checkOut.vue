<template>
  <q-page>
    <div class="panel">
      <div class="container">
        <div class="q-pa-sm col items-start q-gutter-xs" v-for="(itemorder, index) in getItemsCart" :key="index">

          <CSingleCart :order="itemorder.order" :showall="true"/>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="col-6 q-mr-sm" style="text-align: right">
        <span class="text-grey q-mr-xs">Totale:</span> <span
        class="text-subtitle1 q-mr-sm ">€ {{ myTotalPrice.toFixed(2) }}</span>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" src="./checkOut.ts">

</script>

<style lang="scss" scoped>
@import './checkOut';
</style>
