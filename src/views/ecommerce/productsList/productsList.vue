<template>
  <q-page>
    <div class="panel">
      <div class="container">
        <div class="row">
          <div class="q-pa-md row items-start q-gutter-md" v-for="(product, index) in getProducts" :key="index">
            <CProductCard :product="product" :complete="false"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" src="./productsList.ts">

</script>

<style lang="scss" scoped>
@import './productsList';
</style>
