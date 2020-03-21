<template>
  <div>
    <div class="q-my-xs q-gutter-xs q-py-xs text-center">
      <CTitleBanner class="q-pa-xs"
                    title="Navi"
                    bgcolor="bg-primary"
                    clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">

        <CMyNave v-for="(mianave, index) in ris.arrnavi" :naveprop="mianave" :key="index"
                 :navi_partenzaprop="ris.navi_partenza">

        </CMyNave>


      </CTitleBanner>
    </div>
  </div>
</template>
<script lang="ts" src="./allnavi.ts">
</script>
<style lang="scss" scoped>
  @import './allnavi.scss';
</style>
