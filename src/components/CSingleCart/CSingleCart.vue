<template>
  <div class="q-pa-xs q-gutter-xs">

    <div class="row items-center justify-evenly no-wrap">
      <div class="col-2 text-h6 ellipsis">
        <img v-if="" :src="`statics/` + order.product.img" :alt="order.product.name" :class="myimgclass">
      </div>
      <div class="col-4 q-ml-xs">
        {{ order.product.name }}
        <div v-if="showall">
          <br><span class="text-grey">{{ order.product.description }}</span>
        </div>
      </div>
      <div class="col-3">
        <div class="row q-mb-xs no-wrap items-center centeritems">
          <q-btn v-if="showall && !nomodif" round size="xs" text-color="grey" icon="fas fa-minus"
                 @click="addsubqty(false, true)"></q-btn>
          <!--<q-field outlined dense style="width: 25px; height: 20px; " class="q-mx-xs text-subtitle4">
            <template v-slot:control>
              <div class="self-center no-outline" tabindex="0" >{{ order.quantity }}</div>
            </template>
          </q-field>-->
          <div class="q-mx-sm text-blue-14">{{ order.quantity }}</div>
          <q-btn v-if="showall && !nomodif" round size="xs" text-color="grey" icon="fas fa-plus"
                 @click="addsubqty(true, false)"></q-btn>
        </div>
      </div>
      <div class="col-2 no-wrap text-subtitle3 q-mr-sm">
        €&nbsp;{{ (order.price * order.quantity).toFixed(2) }}
      </div>
      <div class="col-1">
        <q-btn v-if="!nomodif" icon="fas fa-times" color="negative" round size="xs" @click="removeFromCard">
        </q-btn>
      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./CSingleCart.ts">
</script>

<style lang="scss" scoped>
@import './CSingleCart.scss';
</style>
