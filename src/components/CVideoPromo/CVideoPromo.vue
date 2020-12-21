<template>
  <div>

    <CTitleBanner :title="`Video ` + $t('site.sitename')"></CTitleBanner>
    <CImgText src="">

      <CTitleBanner class="q-pa-xs" :title="$t('steps.video_intro_1', {sitename: $t('ws.sitename')})"
                    bgcolor="bg-primary"
                    clcolor="text-white"
                    myclass="myshad" canopen="true" :visible="true">

        <div v-if="showconditions">
          <div v-if="toolsext.isLang('fr')">
            <CVideo myvideokey="GZR0ncSaG8s"></CVideo>
          </div>
          <div v-else>
            <CVideo myvideokey="DWfQzbOCK3s"></CVideo>
          </div>
        </div>
        <div v-else>
          <div v-if="toolsext.isLang('si')">
            <CVideo myvideokey="5vJ-xSdoUmk"></CVideo>
          </div>
          <div v-else-if="toolsext.isLang('it')">
            <CVideo myvideokey="GU93sIBG6yM"></CVideo>
          </div>
          <div v-else-if="toolsext.isLang('hr')">
            <CVideo myvideokey="zBksb1vdddw"></CVideo>
          </div>
          <div v-else>
            <CVideo myvideokey="16VpLhir7xg"></CVideo>
          </div>

        </div>
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
