<template>
    <div id="preloader">
        <div v-for="(image, index) in arrimg">
            <img :src="getimg(image)" width="1" height="1"/>
        </div>
    </div>
</template>

<script lang="ts" src="./CPreloadImages.ts">
</script>

<style lang="scss" scoped>
    @import './CPreloadImages.scss';
</style>
