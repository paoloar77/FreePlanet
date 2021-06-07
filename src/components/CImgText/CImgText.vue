<template>
  <div>
    <section class="padding_testo bg-white text-grey-10 text-justify">  <!-- v-scroll-reveal.reset -->
      <div :class="myclass">
        <div :class="clrowcol + ` q-px-xs`">
          <q-img v-if="src" :src="src" class="" :style="style1" :alt="alt1"></q-img>
          <q-img v-if="src2" :src="src2" class="" :style="style1" :alt="alt2"></q-img>
          <div class="section_text">
            <slot></slot>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./CImgText.ts">
</script>
<style lang="scss" scoped>
  @import './CImgText.scss';
</style>
