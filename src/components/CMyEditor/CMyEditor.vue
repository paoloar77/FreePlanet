<template>
  <div>
    <q-card :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
      <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
        <q-toolbar-title>
          Editor
        </q-toolbar-title>
        <q-btn flat round color="white" icon="close" v-close-popup @click="showeditor=false"></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow" style="padding: 4px !important;">

        <CTitleBanner :title="title"></CTitleBanner>
        <form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false">

          <q-btn rounded size="sm" color="primary">
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy>
                <q-color v-model="mycolor" @change="setcolor"></q-color>
              </q-popup-proxy>
            </q-icon>
          </q-btn>
          <q-editor
            ref="editor_ref"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="toolbarcomp"
            debounce="500"
            :fonts="myfonts"
            @input="changeval"
            @paste.native="evt => pasteCapture(evt)"
            @keyup.enter.stop
            v-model="myvalue">
          </q-editor>
        </form>
      </q-card-section>
      <q-card-actions v-if="showButtons" align="center">
        <q-btn flat :label="$t('dialog.ok')" color="primary" @click="saveval"></q-btn>
        <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup @click="annulla"></q-btn>
      </q-card-actions>
    </q-card>

  </div>
</template>

<script lang="ts" src="./CMyEditor.ts">
</script>

<style lang="scss" scoped>
@import './CMyEditor.scss';
</style>
