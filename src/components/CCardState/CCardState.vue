<template>
    <q-card :class="myclass +` text-center`" :style="mystyle">
        <q-circular-progress
                show-value
                :font-size="fontsize"
                :value="myperc"
                :size="getsize"
                :thickness="0.25"
                :color="mycolor"
                track-color="grey-3"
                class="animated"
        >

            <q-avatar v-if="imgsrc" size="60px">
                <img :src="imgsrc">
            </q-avatar>
            <div class="column q-pa-sm text-center">
                <div>
                    {{ mytext }}
                </div>
                <div v-if="myval" class="mlvalue text-h5 text-blue boldhigh text-h5-short"> {{ myval }} {{ textadd }}
                </div>
                <div v-if="isperc" class="cltexth5" :style="'fontsize:' + fontsize">
                    {{ myperc.toFixed(1) }}%
                </div>
            </div>
        </q-circular-progress>
    </q-card>
</template>

<script lang="ts" src="./CCardState.ts">
</script>

<style lang="scss" scoped>
    @import './CCardState.scss';
</style>
