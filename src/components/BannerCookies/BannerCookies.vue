<template>
    <div v-if="isOpen" class="tothebottomfixed" role="dialog">
        <div class="q-pa-md q-gutter-sm">
            <transition appear name="slide-up" mode="out-in" :duration="2000">
                <q-banner class="bg-primary text-white" transition-show="jump-down">
                    {{$t('cookies')}}
                    <template v-slot:action>
                        <q-btn v-if="disableDecline === false" flat color="white" label="Declina"
                               @click="decline"></q-btn>
                        <q-btn flat color="white" label="INFO" type="a" :href="urlInfo" @click="clickInfo"></q-btn>
                        <q-btn flat color="white" label="OK" @click="accept"></q-btn>
                    </template>
                </q-banner>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" src="./BannerCookies.ts">
</script>

<style lang="scss" scoped>
    @import './BannerCookies.scss';
</style>

