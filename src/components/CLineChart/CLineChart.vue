<template>
  <div class="q-pa-sm">
    <line-chart :title="title" :data="getmydata" :round="0" :colors="mycolors"></line-chart>
  </div>
</template>

<script lang="ts" src="./CLineChart.ts">
</script>

<style lang="scss" scoped>
  @import './CLineChart.scss';
</style>
