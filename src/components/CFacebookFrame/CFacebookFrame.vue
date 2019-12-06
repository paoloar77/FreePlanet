<template>
    <div v-if="urlfbpage && fbimage" :class="myclass">
        <!--<div class="fb-page" :data-href="urlfbpage" data-tabs="timeline"-->
        <!--data-width="" data-height="" data-small-header="false" data-adapt-container-width="true"-->
        <!--data-hide-cover="false" data-show-facepile="true">-->
        <!--<blockquote :cite="urlfbpage" class="fb-xfbml-parse-ignore"><a-->
        <!--:href="urlfbpage">{{title}}</a>-->
        <!--</blockquote>-->
        <!--</div>-->

        <a :href="urlfbpage" target="_blank">
            <q-img :src="`statics/` + fbimage" class="imgautosize" alt="facebook page">
            </q-img>
        </a>

        <!--
        <iframe :src="`https://www.facebook.com/plugins/page.php?href=`+geturlfbpageEncoded()+`&tabs=timeline&width=`+mywidth+`&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=164292303671962`"
                width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                allowTransparency="true" allow="encrypted-media"></iframe>
                -->
    </div>
</template>

<script lang="ts" src="./CFacebookFrame.ts">
</script>

<style lang="scss" scoped>
    @import './CFacebookFrame.scss';
</style>
