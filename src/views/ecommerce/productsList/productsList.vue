<template>
  <q-page>
    <div class="panel">
      <div style="padding: 25px;">
        <div class="container">
          <div class="row">

            <div class="col-md-4" v-for="(product, index) in getProducts" :key="index">
              <CProductCard :product="product"/>
            </div>
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
