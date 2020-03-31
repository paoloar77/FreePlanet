<template>
  <div>

    <CTitleBanner title="Video AYNI"></CTitleBanner>
    <CImgText src="">

      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_1')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="true">

        <CVideo myvideokey="ybrjGr52jOI">

        </CVideo>
      </CTitleBanner>
      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_2')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="u90hVKBRD6w">

        </CVideo>
      </CTitleBanner>

        <!--
      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_3')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="ameNIjUWC6A">

        </CVideo>
      </CTitleBanner>

      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_4')" bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="false">

        <CVideo myvideokey="OVlriFnOxG4">

        </CVideo>
      </CTitleBanner>
      -->

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
