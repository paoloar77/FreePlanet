<template>
    <div>
        <div v-if="useinput">
            <q-select
                    :input-class="myclass"
                    filled
                    v-model="myvalue"
                    :use-input="useinput"
                    input-debounce="0"
                    @new-value="newvaluefunc"
                    new-value-mode="add-unique"
                    :options="options"
                    :option-value="optval"
                    :option-label="optlab"
                    @input="changeval"
                    :label="label"
                    dense
            >
            </q-select>
        </div>
        <div v-else>
            <q-select
                    :input-class="myclass"
                    filled
                    v-model="myvalue"
                    :options="options"
                    :option-value="optval"
                    :option-label="optlab"
                    @input="changeval"
                    :label="label"
                    emit-value
                    map-options
                    style="min-width: 170px; max-width: 400px;"
            >

            </q-select>
        </div>
    </div>
</template>

<script lang="ts" src="./CMySelect.ts">
</script>

<style lang="scss" scoped>
    @import './CMySelect.scss';
</style>
