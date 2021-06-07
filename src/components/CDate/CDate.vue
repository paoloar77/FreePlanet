<template>
  <q-input :class="data_class" :bg-color="color" :readonly="readonly" :disable="disable" debounce="1000" :dense="dense"
           :value="getdatestring" stack-label :label="label" @input="changedate" :rounded="rounded"
           mask="##/##/####"
           fill-mask
           :outlined="outlined">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer" :style="mystyleicon">
        <q-popup-proxy v-if="!readonly" ref="datePicker">
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
