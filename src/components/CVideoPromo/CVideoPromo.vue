<template>
  <div>

    <CTitleBanner title="Video AYNI"></CTitleBanner>
    <CImgText src="">

      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_1')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="true">

        <CVideo myvideokey="85zU-2A-Rxs">

        </CVideo>
      </CTitleBanner>
      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_2')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="3JDRkN9z_rM">

        </CVideo>
      </CTitleBanner>
      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_3')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="ameNIjUWC6A">

        </CVideo>
      </CTitleBanner>

      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_4')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="oueTgIH3xYg">

        </CVideo>
      </CTitleBanner>

      <div v-if="showconditions">
        <q-checkbox
          class="bg-grey-4"
          v-model="accetta_saw_video"
          @input="changeval"
          color="primary"
          :label="$t('steps.saw_video_intro')">

        </q-checkbox>
      </div>


    </CImgText>
  </div>
</template>

<script lang="ts" src="./CVideoPromo.ts">
</script>

<style lang="scss" scoped>
  @import './CVideoPromo';
</style>
