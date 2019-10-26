<template>
    <div>
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
                    :fonts="myfonts"
                    @input="changeval"
                    @paste.native="evt => pasteCapture(evt)"
                    v-model="myvalue">
            </q-editor>
        </form>
    </div>
</template>

<script lang="ts" src="./CMyEditor.ts">
</script>

<style lang="scss" scoped>
    @import './CMyEditor.scss';
</style>
