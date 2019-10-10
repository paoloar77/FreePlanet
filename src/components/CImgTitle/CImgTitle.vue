<template>
    <div>
        <q-parallax :src="getsrc" :height="tools.myheight_imgtitle(myheight, myheightmobile)">
            <h2 class="text-white center_to_image title">{{title}}</h2>
            <div v-if="legendinside" class="mylegendinside absolute-bottom custom-caption center_to_image" v-html="legendinside"></div>
        </q-parallax>
        <div v-if="legend" class="mylegend" v-html="legend"></div>
    </div>
</template>

<script lang="ts" src="./CImgTitle.ts">
</script>
<style lang="scss" scoped>
    @import './CImgTitle.scss';
</style>
