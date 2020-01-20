<template>
  <div>
    <CCard :op="getOperatorByUsername(username)" :tab="tab">
    </CCard>

  </div>
</template>

<script lang="ts" src="./CCardOperator.ts">
</script>

<style lang="scss" scoped>
    @import './CCardOperator.scss';
</style>
