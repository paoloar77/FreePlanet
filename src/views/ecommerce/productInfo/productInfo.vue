<template>
  <q-page>
    <div class="panel">
      <div class="container">
        <div class="row">
          <CProductCard :code="code" complete="true"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" src="./productInfo.ts">

</script>

<style lang="scss" scoped>
@import './productInfo';
</style>
