<template>
    <div>
        <q-parallax :src="getsrc" :height="tools.myheight_imgtitle(myheight, myheightmobile)">
            <h1 class="text-white title" style="text-align: center" >{{title}}</h1>
            <div v-if="legendinside" class="mylegendinside absolute-bottom custom-caption" style="text-align: center" v-html="legendinside"></div>
        </q-parallax>
        <div v-if="legend" class="mylegend" v-html="legend"></div>
    </div>
</template>

<script lang="ts" src="./CImgTitle.ts">
</script>
<style lang="scss" scoped>
    @import './CImgTitle.scss';
</style>
