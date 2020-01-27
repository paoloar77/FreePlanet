<template>
  <div class="column q-pa-sm cursor-pointer" @click="copytoclip">
    <q-field outlined bottom-slots :label="title" stack-label class="text-center">
      <template v-slot:prepend>
        <q-btn round dense flat icon="far fa-copy" />
      </template>

      <template v-slot:control>
        <div class="self-center full-width no-outline text-center wrapword text-h5" tabindex="0">{{texttocopy}}</div>
      </template>
    </q-field>
  </div>
</template>

<script lang="ts" src="./CCopyBtn.ts">
</script>

<style lang="scss" scoped>
  @import './CCopyBtn.scss';
</style>
