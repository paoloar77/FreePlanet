<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">

      <q-card class="my-card">
        <q-img :src="`statics/` + product.img">
        </q-img>

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="fas fa-cart-plus"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ product.name }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place"/>
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px"/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            € {{ product.price }}
          </div>
          <div class="text-caption text-grey">
            {{ product.description }}
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions>
          <q-btn flat round icon="event"/>
          <q-btn flat color="primary">
            Aggiungi al Carrello
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" src="./CProductCard.ts">
</script>

<style lang="scss" scoped>
@import './CProductCard.scss';
</style>
