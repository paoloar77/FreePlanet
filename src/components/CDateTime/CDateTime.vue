<template>
    <q-input v-model="myvalue"
             color="blue-6"
             outlined
             :label="label"
             :bg-color="bgcolor"
             :readonly="readonly"
             :disable="disable"
             :dense="dense"
             mask="####-##-## ##:##"
             debounce="500"
             @input="changeval"
             :class="getclass">

        <template #append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy v-model="showDateTimeScroller">

                    <q-date-time-scroller
                            v-model="myvalue"
                            :locale="locale"
                            :hour24-format="true"
                            :rounded-borders="true"
                            border-color="#2196f3"
                            bar-color="#2196f3"
                            color="white"
                            background-color="primary"
                            inner-color="primary"
                            inner-background-color="white"
                            :style="scrollerPopupStyle280"
                            @input="changeval"
                            @close="() => { savetoclose();  }"
                    />

                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script lang="ts" src="./CDateTime.ts">
</script>

<style lang="scss" scoped>
    @import './CDateTime.scss';
</style>
