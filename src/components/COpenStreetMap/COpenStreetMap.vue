<template>
    <div class="flex flex-center column justify-center">
        <div class="">
            <span class="text-subtitle2">{{title}}</span> - (<a :href="`https://www.openstreetmap.org/?` + coord_big + `&layers=N`" target="_blank">{{$t('showbigmap')}}</a>)
        </div>
        <div>
            <iframe :width="mywidth" :height="myheight" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                    :src="`https://www.openstreetmap.org/export/embed.html?bbox=` + coordinates"
                    style="border: 1px solid black"></iframe>

        </div>
    </div>
</template>
<script lang="ts" src="./COpenStreetMap.ts">
</script>

<style lang="scss" scoped>
    @import './COpenStreetMap.scss';
</style>
