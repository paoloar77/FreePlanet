<template>
    <q-card class="q-ma-xs" bordered>
        <q-card-section>
            <div class="text-h6 bg-deep-purple-8 text-white text-center">Per accedere alla Tessera:
            </div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section>
            <iframe v-if="rightDrawerOpen" id="frametessera" ref="frametessera"
                    src="https://www.conceptstudio.it/website/csenravenna/electro/"
                    style="border: 0; width: 100%; max-width: 360px; min-height: 500px;"></iframe>

        </q-card-section>
        <!--Elisa GHZLSE78A65G388B-->
    </q-card>
</template>
<script lang="ts" src="./CTesseraElettronica.ts">
</script>

<style lang="scss" scoped>
    @import './CTesseraElettronica.scss';
</style>
