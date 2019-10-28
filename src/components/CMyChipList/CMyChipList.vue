<template>
    <div class="clchip">
        <div v-for="(rec, index) in myarrvalues">
            <q-chip dense
                    :color="rec.color"
                    text-color="white"
                    :icon="rec.icon">
                {{rec.label}}
            </q-chip>
        </div>
    </div>
</template>

<script lang="ts" src="./CMyChipList.ts">
</script>

<style lang="scss" scoped>
    @import './CMyChipList.scss';
</style>
