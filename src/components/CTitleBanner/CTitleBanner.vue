<template>
  <div>
    <q-banner
      inline-actions
      rounded dense
      :class="bgcolor+` q-my-sm `+clcolor+ ` ` + myclass"
      style="text-align: center; "
      @click="myvisible = !myvisible"
    >
      <template v-slot:avatar>
        <q-icon v-if="canopen && icon" :name="icon" color="white"/>
      </template>
      <template v-slot:action>
        <div class="cursor-pointer">
          <q-icon v-if="canopen" :name="iconopen" color="white"/>
        </div>
      </template>
      <span :class="`mybanner `+ myclasstext" :style="mystyle">{{title}}</span>
    </q-banner>

    <q-slide-transition>
      <div v-show="myvisible" class="rounded-borders">
        <slot></slot>
      </div>
    </q-slide-transition>

  </div>
</template>

<script lang="ts" src="./CTitleBanner.ts">
</script>
<style lang="scss" scoped>
  @import './CTitleBanner.scss';
</style>
