<template>
  <q-card class="my-card">
    <img :src="`statics/` + product.img" :alt="product.name">

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="fas fa-info"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
        @click="infoproduct"
      />

      <div class="row items-center">
        <div class="text-h7">
          {{ product.name }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-title text-grey-9">
          <span class="text-grey-7">{{ product.description }}</span>
        </div>
      </div>
      <div>
        <div>
          <div class="text-grey text-title row items-center q-mt-sm">
            <q-icon name="map" class="q-mr-xs"/>
            Origine: <span class="text-blue q-ml-xs text-h8"> {{ product.producer.city }} ({{
              product.producer.region
            }})</span>
          </div>

        </div>
        <div class="text-grey text-title row items-center">
          <q-icon name="place" class="q-mr-xs"/>
          Produttore: <span class="text-black q-ml-xs text-h8"> {{ product.producer.name }}</span>
        </div>
      </div>

      <!--<q-rating v-model="product.stars" :max="5" size="32px" readonly/>-->
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row q-mb-sm no-wrap items-center centeritems">
        <div class="text-price q-mr-md no-wrap">
          € {{ product.price.toFixed(2) }}
        </div>
      </div>
      <div class="row q-mb-sm no-wrap items-center centeritems">
        <q-btn round size="xs" text-color="grey" icon="fas fa-minus" @click="decqty"></q-btn>
        <q-field outlined dense style="width: 40px; height: 30px;" class="q-mx-xs">
          <template v-slot:control>
            <div class="self-center no-outline" tabindex="0">{{ order.quantity }}</div>
          </template>
        </q-field>
        <q-btn round size="xs" text-color="grey" icon="fas fa-plus" @click="addqty"></q-btn>
      </div>
      <div class="text-blue text-title row items-center q-mr-md centeritems">
        <q-icon size="sm" name="fas fa-shipping-fast" class="q-mr-sm"/>
        Ritiro presso:
      </div>
      <div class="text-green-6 text-title row items-center q-my-sm centeritems">

        <div v-if="getnumstore() > 1">
          <q-select
            outlined v-model="order.idStorehouse"
            :options="getStorehouses()"
            label="Magazzino:" emit-value map-options>
          </q-select>
        </div>
        <div v-else>
          <span class="text-title text-center">{{ getSingleStorehouse() }}</span>
        </div>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions vertical align="center">
      <q-btn icon="fas fa-cart-plus" color="primary" :disable="checkifCartDisable" rounded size="md" label="Aggiungi al Carrello" @click="addtoCart">
      </q-btn>
      <q-btn :icon="iconWhishlist(product)" flat color="primary" rounded label="Lista Desideri">
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" src="./CProductCard.ts">
</script>

<style lang="scss" scoped>
@import './CProductCard.scss';
</style>
