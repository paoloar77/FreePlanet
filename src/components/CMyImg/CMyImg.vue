<template>
  <div v-if="src" class="text-center">
    <q-img :src="src" class="myimg" :style="mystyle" :alt="getalt">
    </q-img>
  </div>
</template>

<script lang="ts" src="./CMyImg.ts">
</script>
<style lang="scss" scoped>
  @import './CMyImg.scss';
</style>
