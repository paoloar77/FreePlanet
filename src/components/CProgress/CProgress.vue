<template>
    <div class="flex-item progress-item shadow-1">
        <q-linear-progress
                stripe
                rounded
                :value="progressval / 100"
                class="cpr-progrbar-item"
                :color="cpr_colProgress"
        >
        </q-linear-progress>
        <div :class="cpr_percProgress">
            {{getdescr}} {{progressval}}%
        </div>
    </div>
</template>

<script lang="ts" src="./CProgress.ts">
</script>

<style lang="scss" scoped>
    @import './CProgress.scss';
</style>
