<template>
    <div id="q-app">
        <q-layout :style="">
            <app-header></app-header>
            <div class="layout-view">
                <q-ajax-bar></q-ajax-bar>
                <q-page-container>
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </q-page-container>
            </div>
        </q-layout>
        <!--<appsignup v-show="true" @close="myshowModal=false"></appsignup>-->

    </div>
</template>
<script lang="ts" src="./App.ts">
</script>
<style lang="scss">
    @import './App.scss';
</style>
