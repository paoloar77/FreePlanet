<template>
    <div>
        <q-img v-if="imgbackground" :src="getsrc" :alt="getaltimg"
               :style="tools.styles_imgtitle(sizes)">

            <div class="absolute-bottom text-body1 text-center" :style="styleadd">
                <h1 class="titletext" v-html="headtitle"></h1>
            </div>
        </q-img>

        <!--
        <q-parallax :height="tools.myheight_imgtitle()" :width="tools.mywidth_imgtitle()">
            <template v-slot:media>
                <img :src="imgbackground" class="cltitlebg">
            </template>
            <h2 class="titletext">{{headtitle}}</h2>
        </q-parallax>
        -->

    </div>
</template>

<script lang="ts" src="./CTitle.ts">
</script>
<style lang="scss" scoped>
    @import './CTitle.scss';
</style>
