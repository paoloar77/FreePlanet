<template>
  <div>
    <div class="row justify-evenly items-center q-gutter-sm ">

      <div class="text-center">
        <div class="subtitle_small text-blue" v-html="getvideotit"></div>
        <div class="">
          <iframe
            :width="tools.getwidthscale(mythis(), getValDb('YT_W', false), 800)"
            :height="tools.getheightbywidth(mythis(), getValDb('YT_W', false), getValDb('YT_H', false), 800)"
            :src="tools.getvideobyidyoutube(myvideokey)"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts" src="./CVideo.ts">
</script>
<style lang="scss" scoped>
  @import './CVideo.scss';
</style>
