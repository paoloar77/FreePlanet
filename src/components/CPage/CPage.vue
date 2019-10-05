<template>
    <q-page class="text-white">
        <div class="landing">
            <CTitle :src="imghead" :title="headtitle">
            </CTitle>

            <section class="padding_testo bg-white text-grey-10 text-center" v-scroll-reveal.reset>
                <div class="landing__features row items-start q-col-gutter-xs intro">
                    <div class="intro__associazione">
                        <!--<img src="../../statics/images/scuolaopbenessere/16427623_404497389905092_1266178961781563443_n.jpg">-->
                        <img :src="img1">
                        {{text1}}
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </div>

    </q-page>


</template>
<script lang="ts" src="./CPage.ts">
</script>
<style lang="scss" scoped>
    @import './CPage.scss';
</style>
