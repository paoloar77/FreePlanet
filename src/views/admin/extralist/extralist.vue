<template>
  <div>
    <CTitleBanner title="Importa Lista Utenti Extra:"></CTitleBanner>
    <div class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">

      <q-input v-model="users_imported"
               autofocus
               filled
               bordered
               color="blue-12"
               @keyup.enter.stop
               type="textarea"
      >
      </q-input>
      <div class="q-ma-md q-pa-sm text-center">
        <q-btn :loading="myloadingImport" rounded outline :disable="users_imported === ''"
               @click="importExtraList" color="primary" icon="email">
          Importa Lista Utenti Extra
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left"/>
            Importazione Utenti in corso ...
          </template>
        </q-btn>
      </div>

      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear

      >
        <CTitleBanner v-if="errimport" bgcolor="bg-warning" :title="myrisimport"></CTitleBanner>
        <CTitleBanner v-if="okimport" :title="myrisimport"></CTitleBanner>
      </transition>
    </div>

  </div>
</template>
<script lang="ts" src="./extralist.ts">
</script>

<style lang="scss" scoped>
    @import './extralist';
</style>
