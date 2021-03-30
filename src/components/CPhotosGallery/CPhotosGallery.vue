<template>
  <div>
    <div class="text-black">
      <q-checkbox v-model="withThumbnails" label="Miniature">
      </q-checkbox>
      <q-checkbox v-model="withCaptions" label="Didascalie">
      </q-checkbox>
      <q-select v-model="dimensione" :options="dimensioneImg"
                style="max-width: 150px"
                rounded
                outlined
                dense
                label="Altezza"
                emit-value map-options
                @input="changedim"
      ></q-select>
    </div>

    <q-carousel
      animated
      infinite
      arrows
      control-color="primary"
      control-text-color="white"
      swipeable
      :thumbnails="withThumbnails"
      transition-next="slide-left"
      transition-prev="slide-right"
      v-model="slide2"
      :class="`bg-grey-1 shadow-2 rounded-borders ` + myclass + ' gallery2 ' "
      @transition="setTransition"

    >
      <q-carousel-slide v-for="(rec, index) in mygallery" v-if="rec.ingallery"
                        :key="index" :name="index" :img-src="rec.img">

        <div v-if="rec.ingallery && withCaptions" class="absolute-bottom custom-caption"
             style="margin-bottom: 70px">
          <div v-if="!!rec.title" class="text-h5"><span style="font-size: 1.25rem;">{{ getTitle(rec) }}</span></div>
          <div class="subtitle" v-html="getsubtitle(rec)"></div>
        </div>
      </q-carousel-slide>

      <!--<template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>-->
    </q-carousel>

    <br>
  </div>
</template>

<script lang="ts" src="./CPhotosGallery.ts">
</script>

<style lang="scss" scoped>
@import './CPhotosGallery.scss';
</style>
