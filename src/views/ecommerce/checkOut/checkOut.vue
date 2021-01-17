<template>
  <q-page>
    <CTitleBanner title="Carrello"></CTitleBanner>
    <div class="panel">
      <div>
        <div class="container">
          <div class="q-pa-sm col items-start q-gutter-xs" v-for="(itemorder, index) in getItemsCart" :key="index">

            <CSingleCart :order="itemorder.order" :showall="true"/>
          </div>
        </div>
        <q-separator></q-separator>
        <div class="col-6 q-mr-sm" style="text-align: right">
          <span class="text-grey q-mr-xs">Totale:</span> <span
          class="text-subtitle1 q-mr-sm ">€ {{ myTotalPrice }}</span>
        </div>

        <q-input v-model="note" style="max-width: 400px;" label="Note aggiuntive:"
                 filled dense
                 debounce="1000"
                 autogrow
                 @input="change_field('note')">
        </q-input>

        <br>
      </div>

      <q-stepper-navigation>
        <q-btn rounded icon="fas fa-shopping-cart" color="green" label="Completa l'Ordine" class="q-mb-sm"
               :disabled="myTotalQty < 1"
               @click="completeOrder"></q-btn>
      </q-stepper-navigation>

    </div>
  </q-page>
</template>

<script lang="ts" src="./checkOut.ts">

</script>

<style lang="scss" scoped>
@import './checkOut';
</style>
