<template>
    <div>
        <div class="cltoggle" v-for="(rec, index) in myarrvalues">
            <q-toggle
                    v-model="rec.valbool"
                    :label="rec.label"
                    :color="tools.getColorByIndexBest(index)"
                    keep-color
                    @input="changeval">
            </q-toggle>
        </div>
    </div>
</template>

<script lang="ts" src="./CMyToggleList.ts">
</script>

<style lang="scss" scoped>
    @import './CMyToggleList.scss';
</style>
