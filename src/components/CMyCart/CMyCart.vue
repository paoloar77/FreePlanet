<template>
  <div>
    <div id="mycontainer">
      <div class="myheader row justify-between">
        <div class="col-6">
          <q-btn class="q-mx-xs" round dense flat icon="fas fa-shopping-cart">

            <q-badge v-if="getnumItemsCart > 0" color="red" floating transparent>
              {{ getnumItemsCart }}
            </q-badge>
          </q-btn>
        </div>
        <div class="col-6" style="text-align: right">
          <span v-if="myTotalPrice" class="text-grey q-mr-xs">Totale:</span> <span
          class="text-subtitle1 q-mr-sm ">€ {{ myTotalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <q-separator></q-separator>
      <div id="mybody">
        <div v-for="(rec, index) in ordersCart" :key="index" class="col">

          <CSingleCart
            :order="rec.order"
            :showall="false">
          </CSingleCart>

        </div>
      </div>
      <div v-if="numOrders === 0" style="text-align: center" class="text-grey">
        Il Carrello è Vuoto
      </div>
      <div v-else style="text-align: center">
        <q-btn rounded icon="fas fa-shopping-cart" color="green" label="Vai alla Cassa" class="q-mb-sm" to="/checkout" @click="closecart"></q-btn>
      </div>
    </div>
  </div>

  </div>
</template>

<script lang="ts" src="./CMyCart.ts">
</script>

<style lang="scss" scoped>
@import './CMyCart.scss';
</style>
