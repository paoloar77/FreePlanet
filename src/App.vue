<template>
    <div id="q-app">
        <div class="q-pa-xs">
            <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
                <app-header></app-header>
                <q-ajax-bar></q-ajax-bar>

                <q-page-container>
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </q-page-container>
            </q-layout>
        </div>
    </div>
</template>
<script lang="ts" src="./App.ts">
</script>
<style lang="scss">
    @import './App.scss';
</style>
