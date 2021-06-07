<template>
  <div class="q-ma-sm">
    <div class="column cursor-pointer" @click="copytoclip">
      <q-field outlined :label="title" stack-label class="text-center cursor-pointer">
        <template v-slot:prepend v-if="!tools.isMobile()">
          <q-btn round dense flat icon="far fa-copy"/>
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-center wrapword text-h5" tabindex="0">{{texttocopy}}</div>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script lang="ts" src="./CCopyBtn.ts">
</script>

<style lang="scss" scoped>
  @import './CCopyBtn.scss';
</style>
