<template>
  <div class="q-pa-sm" style="width: 100%;">
    <!--<line-chart :data="mydata"></line-chart>-->

    <div class="q-gutter-y-md" style="max-width: 1200px">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="world" label="World"></q-tab>
        <q-tab name="europe" label="Europe"></q-tab>

      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="world">
          <geo-chart :data="getmydatafixed" :library="myoptionsWorld"></geo-chart>
        </q-tab-panel>
        <q-tab-panel name="europe">
          <geo-chart :data="getmydatafixed" :library="myoptionsEurope"></geo-chart>
        </q-tab-panel>
      </q-tab-panels>
    </div>


    <!--<line-chart :data="chartData"></line-chart>-->

  </div>
</template>

<script lang="ts" src="./CGeoChart.ts">
</script>

<style lang="scss" scoped>
  @import './CGeoChart.scss';
</style>
