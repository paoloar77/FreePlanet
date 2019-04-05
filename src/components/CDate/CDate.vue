<template>
    <q-input :class="data_class" debounce="1000" dense :value="getdatestring" stack-label :label="label" @input="changedate">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" :style="mystyleicon">
                <q-popup-proxy ref="datePicker">
                    <q-date :value="getdateyymmddstring" today-btn @input="changedate"></q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script lang="ts" src="./CDate.ts">
</script>

<style lang="scss" scoped>
    @import './CDate.scss';
</style>
