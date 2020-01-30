<template>
  <div>
    <CTitleBanner title="Operazioni su DB:"></CTitleBanner>
    <div class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">

      <q-btn label="Passa i codici Telefoni sul campo cell" color="primary" @click="changeCellInt"></q-btn>
    </div>


    <q-field
      stack-label
      dense
      >
      <template v-slot:control>
        <div class="self-center full-width no-outline text-center" tabindex="0">{{ris}}</div>
      </template>

    </q-field>

  </div>
</template>
<script lang="ts" src="./dbop.ts">
</script>

<style lang="scss" scoped>
    @import './dbop';
</style>
