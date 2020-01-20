<template>
  <div>
    <div v-if="rec">
      <!--<CMyPage :title="rec.title" :imgbackground="`statics/` + rec.imgback" :sizes="`max-height: ` + rec.heightimg + `px`">-->

      <div class="q-ma-sm q-gutter-sm q-pa-xs">
        <div v-if="rec.content" v-html="rec.content">
        </div>
      </div>
      <!--</CMyPage>-->
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" src="./CMyInnerPage.ts">

</script>
<style lang="scss" scoped>
  @import 'CMyInnerPage.scss';
</style>
