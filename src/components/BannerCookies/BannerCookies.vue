<template>
    <div v-if="isOpen">
        <div class="q-pa-md q-gutter-sm tothebottomfixed">
            <transition appear name="slide-up" mode="out-in" :duration="2000">
                <q-banner class="bg-primary text-white" transition-show="jump-down">
                    Usiamo i Cookie per una migliore prestazione web.
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

