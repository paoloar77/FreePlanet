<template>
    <div class="row clchip">
        <div v-for="(rec, index) in myarrvalues">
          <q-chip v-if="rec.icon"
                    dense
                    :color="rec.color"
                    text-color="white"
                    :icon="rec.icon">
                {{rec.label}}
            </q-chip>
            <q-chip dense
                    :color="rec.color"
                    text-color="white">
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
