<template>
    <div v-if="coordinates" class="flex flex-center column justify-center">
        <div class="">
            <span class="text-subtitle2" v-html="title"></span> - (<a
                :href="`https://www.openstreetmap.org/?` + coord_big + `&layers=N`"
                target="_blank">{{$t('showbigmap')}}</a>)
        </div>
        <div>
            <iframe :width="mywidth" :height="myheight" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                    :src="`https://www.openstreetmap.org/export/embed.html?bbox=` + coordinates"
                    style="border: 1px solid black"></iframe>

        </div>
    </div>
    <div v-else>
        <div class="q-my-md">
            <p class="text-subtitle2 text-center">
                <span v-html="title"></span>
                - <a href="urlmap" target="_blank" class="text-black">Apri Mappa</a>
            </p>
            <a :href="urlmap" target="_blank">
                <q-img :src="`statics/` + imgmap" class="imgautosize" alt="my map">
                </q-img>

            </a>
        </div>
    </div>
</template>
<script lang="ts" src="./COpenStreetMap.ts">
</script>

<style lang="scss" scoped>
    @import './COpenStreetMap.scss';
</style>
