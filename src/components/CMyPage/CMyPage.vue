<template>
  <div>
    <div v-if="mypath && !!rec">
      <div class="q-ma-sm q-gutter-sm q-pa-xs">
        <div v-if="!!rec.img1" class="text-center">
          <q-img :src="`statics/`+ rec.img1" class="img"></q-img>
        </div>

        <div v-if="!!rec.content" v-html="rec.content"></div>
        <q-video v-if="!!rec.video1" :src="rec.video1" :ratio="rec.ratio1">
        </q-video>

        <div v-if="!!rec.img2" class="text-center">
          <q-img :src="`statics/`+ rec.img2" class="img"></q-img>
        </div>

        <div v-if="!!rec.content2" v-html="rec.content2"></div>
        <q-video v-if="!!rec.video2" :src="rec.video2" :ratio="rec.ratio2"></q-video>

        <div v-if="!!rec.img3" class="text-center">
          <q-img :src="`statics/`+ rec.img2" class="img"></q-img>
        </div>

        <div v-if="!!rec.content3" v-html="rec.content3"></div>
        <q-video v-if="!!rec.video3" :src="rec.video3" :ratio="rec.ratio3"></q-video>
        <div v-if="!!rec.content4" v-html="rec.content4"></div>

      </div>

    </div>
    <div v-else>
      <div v-if="!!title">
        <CTitle v-if="imgbackground" :imgbackground="imgbackground"
                :headtitle="title" :sizes="sizes" :styleadd="styleadd"></CTitle>
        <div v-if="!imgbackground">
          <CImgTitle v-if="img" :src="img" :title="title">
          </CImgTitle>
        </div>
        <slot></slot>
        <div v-if="!nofooter">
          <Footer></Footer>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" src="./CMyPage.ts">
</script>
<style lang="scss" scoped>
@import './CMyPage.scss';
</style>
