<template>
  <div>
    <q-banner
      inline-actions
      rounded dense
      :class="bgcolor+` cursor-pointer q-my-sm `+clcolor+ ` ` + myclass + ' ' + getclass"
      style="text-align: center; "
      @click="apri()"
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
      <div v-if="myvisible" class="rounded-borders">
        <slot></slot>
      </div>
      <div v-if="imgpreview" class="text-center cursor-pointer clBorderSteps" style="opacity: 0.5;" @click="myvisible = !myvisible">
        <q-img :src="imgpreview" class="img"></q-img>
      </div>
    </q-slide-transition>

  </div>
</template>

<script lang="ts" src="./CTitleBanner.ts">
</script>
<style lang="scss" scoped>
  @import './CTitleBanner.scss';
</style>
