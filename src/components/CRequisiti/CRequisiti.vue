<template>
  <div class="q-ma-md">
    <div :class="getcl">
      <div v-if="statebool" v-html="msgTrue"></div>
      <div v-else v-html="msgFalse"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./CRequisiti.ts">
</script>

<style lang="scss" scoped>
  @import './CRequisiti.scss';
</style>
