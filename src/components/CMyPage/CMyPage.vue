<template>
    <div>
        <CTitle v-if="imgbackground" :imgbackground="imgbackground"
                :headtitle="title" :sizes="sizes" :styleadd="styleadd"></CTitle>
        <div v-if="!imgbackground">
            <CImgTitle v-if="img" :src="img" :title="title">
            </CImgTitle>
        </div>
        <slot></slot>
        <div v-if="!nofooter">
            <Footer></Footer>
        </div>
    </div>
</template>


<script lang="ts" src="./CMyPage.ts">
</script>
<style lang="scss" scoped>
    @import './CMyPage.scss';
</style>
