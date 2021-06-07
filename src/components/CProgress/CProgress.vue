<template>
    <div>
        <div class="flex-item progress-item shadow-1">
            <q-slider v-if="slider" label
                      class="cpr-slider-item"
                      :readonly="readonly"
                      :value="progressval"
                      :min="0"
                      :max="100"
                      @change="setchange"
                      :step="5">
            </q-slider>
            <q-linear-progress
                    v-else
                    stripe
                    :readonly="readonly"
                    rounded
                    :value="progressval / 100"
                    class="cpr-progrbar-item"
                    :color="cpr_colProgress">
            </q-linear-progress>

            <div :class="cpr_percProgress">
                {{getdescr}} {{progressval}}%
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./CProgress.ts">
</script>

<style lang="scss" scoped>
    @import './CProgress.scss';
</style>
